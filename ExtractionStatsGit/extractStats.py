import os
import re
from config import *
import argparse
import xlsxwriter
from enum import Enum

TEMP_STAT_FILE = "./__out__"
BIG_COMMIT_TRESHOLD = 1000
INDICE = 0
COLUMN = 0
workbook = xlsxwriter.Workbook('task_other.xlsx')
worksheet = workbook.add_worksheet()
bold = workbook.add_format({'bold': 1})

class options(Enum):
    COMMIT = "commit"
    INSERTIONS = "insertions"
    DELETE = "delete"

class Author:
    def __init__(self, name, row):
        self.name = name
        self.row = row
        self.changes = {}

class Commit:
    def __init__(self):
        self.id = "No ID"
        self.date = "No date"
        self.commiter ="No author"
        self.authors = []

class RegularCommit(Commit):
    def __init__(self):
        super().__init__()
        self.files = 0
        self.inserted = 0
        self.deleted = 0
        self.task = NONE

class MergeCommit(Commit):
    def __init__(self):
        super().__init__()
        self.branch = "Undefined"

class StatAuthor:
    def __init__(self):
        self.inserted = 0
        self.deleted = 0
        self.commits = 0

def intersection(l1,l2):
    result = []
    for item in l1:
        if item in l2:
            result.append(item)
    return result

def cleanLine(line):
    line = line.replace("("," (")
    line = line.replace(")",") ")
    line = line.replace(":"," : ")
    line = line.replace("-"," - ")
    return line


def getStatFile(tempFile = TEMP_STAT_FILE):
    os.system("git log --shortstat --date=short > {}".format("./__out__"))
    stats = open(tempFile)
    return stats


def removeStatFile(tempFile = TEMP_STAT_FILE):
    if os.path.exists(tempFile):
        os.remove(tempFile)


def containsOne(array1,array2):
    for item in array1:
        if item in array2:
            return True
    return False

def readNextLine(file):
    line = file.readline()
    if line == "":
        file.close()
        removeStatFile("__out__")
        raise Exception("Fin de lecture anormale")
    return re.split(" |:",line.strip())

def readNextLineAndClean(file):
    line = file.readline()
    if line == "":
        file.close()
        removeStatFile("__out__")
        raise Exception("Fin de lecture anormale")
    line = cleanLine(line.strip())
    return re.split(" |:",line)

def findTask(list):
    if containsOne(list,config["task_code"]["dev"]):
        return DEV
    elif containsOne(list,config["task_code"]["debug"]):
        return DEBUG
    elif containsOne(list,config["task_code"]["refactor"]):
        return REFACTOR
    elif containsOne(list,config["task_code"]["test"]):
        return TEST
    elif containsOne(list,config["task_code"]["other"]):
        return OTHER
    else:
        return NONE


def findAuthors(list):
    if args.authors:
        target_authors = args.authors
    elif 'authors_id' in config:
        target_authors = config['authors_id']
    else:
        target_authors = []

    authors = []
    for a in target_authors:
        if a in list:
            authors.append(a)

    return authors

def skipRemaining(stats):
    line = stats.readline()
    while line != "" and not line.startswith("commit"):
        line = stats.readline()
    return line

def processError(stats,line)  :
    print("Erreur de lecture: ")
    print(" ".join(line))
    return skipRemaining(stats)


def accept(commit):

    if args.sprint:
        begin_date = sprints[args.sprint]['begin']
        end_date = sprints[args.sprint]['end']

    else:
        begin_date = date(*args.begin) if args.begin else config['period'].get('begin',date(1,1,1))
        end_date = date(*args.end) if args.end else config['period'].get('end',date(9999,1,1))

    if commit.date < begin_date:
        return False
    if end_date < commit.date:
        return False

    if args.authors:
        if intersection(commit.authors, args.authors) == []:
            return False
    else:
        if 'authors' in config and commit.commiter not in config['authors']:
            if 'authors_id' in config:
                if intersection(commit.authors,config['authors_id']) == []:
                    return False

    if type(commit) is RegularCommit:
        if args.tasks:
            if commit.task not in args.tasks:
                return False
        else:
            if 'tasks' in config and commit.task not in config['tasks']:
                return False
    else:
        if not config['merge']:
            return False

    if commit.id in config['forget']:
        return False

    if type(commit) is RegularCommit:
        if commit.inserted > BIG_COMMIT_TRESHOLD or commit.deleted > BIG_COMMIT_TRESHOLD:
            print("*** Very big commit: {}  ins. = {}  del. = {}".format(commit.id,commit.inserted,commit.deleted))
            return False

    return True

def parseStats(stats):
    commits = []

    line = stats.readline()
    while line != "":
        line = line.strip().split(' ')
        if line[0] == "commit":
            commitId = line[1]
        else:
            line = processError(stats)
            continue

        # Ignore merge line
        line = readNextLine(stats)
        if line[0] == "Merge":
            newCommit = MergeCommit()
            line = readNextLine(stats)
        else:
            newCommit = RegularCommit()

        newCommit.id = commitId

        # read author line
        if line[0] == "Author":
            newCommit.commiter = line[-1]
        else:
            line = processError(stats,line)
            continue

        # read date line
        line = readNextLine(stats)
        if line[0] == "Date":
            dateInfo = line[-1].split("-")
            newCommit.date = date(int(dateInfo[0]),int(dateInfo[1]),int(dateInfo[2]))
        else:
            line = processError(stats,line)
            continue

        # read blank line
        line = readNextLine(stats)

        if type(newCommit) is RegularCommit:
            line = readNextLineAndClean(stats)
            line = list(map(lambda x: x.upper(), line))
            newCommit.task = findTask(line)
            newCommit.authors = findAuthors(line)

            while True:
                line = readNextLine(stats)

                if len(line) > 1 and line[1] == "reverts":
                    break

                if len(line) > 2 and line[2] == "changed,":
                    break

                if len(line) > 0 and line[0] == "Merge":
                    break

            if line[2] == "changed,":
                newCommit.files = line[0]
                if line[4].startswith("insertion"):
                    newCommit.inserted = int(line[3])
                    if len(line) > 5:
                        newCommit.deleted = int(line[5])

                if line[4].startswith("deletion"):
                    newCommit.deleted = int(line[3])
            elif line[1] == 'reverts':
                line = skipRemaining(stats)
                continue
            else:
                line = processError(stats, line)
                continue


        else:
            line = readNextLine(stats)
            if line[0] == "Merge":
                if len(line) > 2:
                    newCommit.branch = line[2]

        if accept(newCommit):
            commits.append(newCommit)

        line = skipRemaining(stats)

    stats.close()
    removeStatFile("./__out__")
    return commits
        


def statsPerCommiter(commits):
    stats = {}

    for c in filter(lambda c: type(c) is RegularCommit, commits):
        if c.commiter not in stats:
            stats[c.commiter] = StatAuthor()

        stats[c.commiter].inserted += c.inserted
        stats[c.commiter].deleted += c.deleted
        stats[c.commiter].commits += 1

    return stats

def statsPerAuthor(commits):
    stats = {}

    for c in filter(lambda c: type(c) is RegularCommit, commits):
        for a in c.authors:
            if a not in stats:
                stats[a] = StatAuthor()

            stats[a].inserted += c.inserted
            stats[a].deleted += c.deleted
            stats[a].commits += 1

    return stats



def addDate (value, array):
    for val in array:
        if val == str(value):
            return
    array.append(str(value))

def commiterToAuthor(commiter):
    if commiter == "<sburwash@live.ca>":
        return "Stéphane Burwash"
    elif commiter == "<tootmas@gmail.com>" or commiter == "<tmcadams17@gmail.com>":
        return "Thomas McAdams"
    elif commiter == "<gasparfaure@hotmail.com>":
        return "Gaspar Faure"
    elif commiter == "<valiquettewilliam@gmail.com>":
        return "William Valiquette"
    elif commiter == "<jefflavallee123@live.ca>" or commiter == "<jelavr@polymtl.ca>":
        return "Jeffrey Lavallé"
    elif commiter == "<ludovic.bedard@gmail.com>" or commiter == "<ludovic.bedard@polymtl.ca>":
        return "Ludovic Bédard"
    elif commiter == "<trunk@localhost.localdomain>":
        return "Autre"

def addAuthor(author, array):
    global INDICE
    for val in array:
        if val == commiterToAuthor(author):
            return
    array[commiterToAuthor(author)] = Author(commiterToAuthor(author), INDICE)
    INDICE = INDICE + 1

def remove (date):
    indice = 0
    for d in dates:
        if date == d:
            remove(dates[indice])
        indice = indice +1
    return False


###### MAIN  ######

parser = argparse.ArgumentParser()

parser.add_argument("--begin", nargs = 3, type = int,
                    metavar=("ANNEE","MOIS","JOUR"),
                    help = "Date de début de la période à couvrir")
parser.add_argument("--end", nargs = 3, type = int,
                    metavar=("ANNEE","MOIS","JOUR"),
                    help="Date de fin de la période à couvrir")
parser.add_argument("--authors", nargs = "*", metavar="AUTEUR",
                    help = "Les initiales des auteurs pour lesquels on veut extraire les statistiques")
parser.add_argument("--tasks", nargs = "*", metavar = "TACHE",
                    help = "La liste des tâches pour lesquelles on veut extraire les statistiques. Les"
                           "valeurs possibles sont les suivantes: {} {} {} {} {} {}".format(DEV,DEBUG,REFACTOR,TEST,OTHER,NONE))
parser.add_argument("--sprint", type = int,
                    help = "Les stats ne seront fournies que pour le sprint spécifié")


args = parser.parse_args()


worksheet.write("A1", 'Auteur', bold)
worksheet.write("B1", 'Nombre de commits', bold)
worksheet.write("C1", 'Nombre dinsertions', bold)
worksheet.write("D1", 'Nombre de lignes supprimes', bold)
worksheet.write("E1", 'Moyenne nombre insertions / commit', bold)
worksheet.write("F1", 'Moyenne nombre ligne suprimmes / commit', bold)

commits = parseStats(getStatFile())

print("Number of commits:",  len(commits))
row = 1
col = 0
for (commiter,stats) in statsPerCommiter(commits).items():
    print("Commiter {:40} {:4} commits - ins.: {:6}  del.: {:6}   av. ins.: {:6.2f}, av. del: {:6.2f}".format(commiter,
                                                                                    stats.commits,
                                                                                    stats.inserted,
                                                                                    stats.deleted,
                                                                                    stats.inserted/stats.commits,
                                                                                    stats.deleted/stats.commits))
    worksheet.write_string(row, col, commiter)
    worksheet.write_number(row, col+1, stats.commits)
    worksheet.write_number(row, col + 2, stats.inserted)
    worksheet.write_number(row, col + 3, stats.deleted)
    worksheet.write_number(row, col + 4, stats.inserted/stats.commits)
    worksheet.write_number(row, col + 5, stats.deleted/stats.commits)
    row = row + 1


print()
row = row + 2
for (author, stats) in statsPerAuthor(commits).items():
    print("Author {:5} {:4} commits  - ins.: {:6}  del.: {:6}   av. ins.: {:6.2f}, av. del: {:6.2f}".format(author,
                                                                                    stats.commits,
                                                                                    stats.inserted,
                                                                                    stats.deleted,
                                                                                    stats.inserted / stats.commits,
                                                                                    stats.deleted / stats.commits))
    worksheet.write_string(row, col, author)
    worksheet.write_number(row, col+1, stats.commits)
    worksheet.write_number(row, col + 2, stats.inserted)
    worksheet.write_number(row, col + 3, stats.deleted)
    worksheet.write_number(row, col + 4, stats.inserted/stats.commits)
    worksheet.write_number(row, col + 5, stats.deleted/stats.commits)
    row = row + 1

row = row + 2
print("Commit;Date;Author;Task;Files;Inserted;Deleted")

dates = []
authors = {}
colBase = col
ourDate = commits[0].date
for c in commits:
    addDate(c.date, dates)
    addAuthor(c.commiter, authors)

dates.reverse();

def getModifier(commit, modifier):
    if modifier == options.COMMIT:
        return 1
    elif modifier == options.DELETE:
        return commit.deleted
    elif modifier == options.INSERTIONS:
        return commit.inserted



def showByDate(ourRow, modifier):
    baseCol = 0
    for date in dates:
        for author in authors:
            authors[author].changes[date] = 0
        for c in commits:
            if type(c) is RegularCommit:
                print(
                    "{};{};{};{};{};{};{}".format(c.id[:6], c.date, c.commiter, c.task, c.files, c.inserted, c.deleted))

            else:
                print("{};{};{};MERGE;-;-;-".format(c.id[:6], c.date, c.commiter))

            if str(date) == str(c.date):
                authors[commiterToAuthor(c.commiter)].changes[date] = authors[commiterToAuthor(c.commiter)].changes[date] + getModifier(c, modifier)
        worksheet.write(ourRow, baseCol + 1, str(date), bold)
        for ourAuthor in authors:
            worksheet.write_number(ourRow +
                                   authors[ourAuthor].row + 1, baseCol + 1,
                                   authors[ourAuthor].changes[date])
        baseCol = baseCol + 1


    for ourAuthor in authors:
        worksheet.write_string(ourRow + 1 + authors[ourAuthor].row, 0, authors[ourAuthor].name)
    global COLUMN
    COLUMN = baseCol


def addSum(row, col):
    worksheetColumn = xlsxwriter.utility.xl_col_to_name(col+1)
    destination = xlsxwriter.utility.xl_col_to_name(col)
    beginCol= xlsxwriter.utility.xl_col_to_name(0)
    idx = 0
    for author in authors:
        worksheet.write_formula(worksheetColumn + str(row+3+idx), "=SUM(" + beginCol + str(row+3+idx)+ ":" + destination + str(row+3+idx) + ")")
        idx = idx + 1
    worksheet.write(row+1,col+1, "SOMME", bold)


def addPieChart(row, col, name):
    beginCol = xlsxwriter.utility.xl_col_to_name(0)
    endCol = xlsxwriter.utility.xl_col_to_name(col+1)
    chartCol = xlsxwriter.utility.xl_col_to_name(col + 5)
    chart = workbook.add_chart({'type':'pie'})
    chart.add_series({
        'categories': '=Sheet1!' + "$" + beginCol + "$" + str(row+3) + ":" + "$" + beginCol + "$" + str(row+3 + len(authors)-1),
        'values': '=Sheet1!' + "$" + endCol + "$" + str(row+3) + ":" + "$" + endCol + "$" + str(row+3 + len(authors)-1),

    })
    chart.set_title({'name': name})
    worksheet.insert_chart(chartCol + str(row), chart)

def addColumnChart(row,col,name, xaxis, yaxis):
    beginCol = xlsxwriter.utility.xl_col_to_name(0)
    timeBeginCol = xlsxwriter.utility.xl_col_to_name(1)
    endCol = xlsxwriter.utility.xl_col_to_name(col)
    endColminOne = xlsxwriter.utility.xl_col_to_name(col-1)
    chartCol = xlsxwriter.utility.xl_col_to_name(col + 20)
    chart = workbook.add_chart({'type':'column'})
    idx = 0
    for author in authors:
        chart.add_series({

            'name': '=Sheet1!' + "$" + beginCol + "$" + str(row+3+ idx),
            'categories': '=Sheet1!' + "$" + timeBeginCol + "$" + str(row+2) + ":" + "$" + endCol + "$" + str(row+2),
            'values': '=Sheet1!' + "$" + timeBeginCol + "$" + str(row+3 +idx) + ":" + "$" + endCol + "$" + str(row+3+idx),

        })
        idx = idx +1
    chart.set_title({'name': name})
    chart.set_x_axis({'name': xaxis})
    chart.set_y_axis({'name': yaxis})
    worksheet.insert_chart(chartCol + str(row), chart)
def sendByDate(row, name):
    if name == options.COMMIT:
        worksheet.write(row, colBase, 'Nombre de commits', bold)
        worksheet.write(row + 1, colBase, 'Auteur', bold)
        showByDate(row + 1, options.COMMIT)
        addSum(row, COLUMN)
        addPieChart(row, COLUMN, "Nombre de commits")
        addColumnChart(row,COLUMN, "Nombre de commits par jour", "Date", "Nombre de commits")

    elif name == options.INSERTIONS:
        worksheet.write(row, colBase, "Nombre d'insertions", bold)
        worksheet.write(row + 1, colBase, 'Auteur', bold)
        showByDate(row + 1, options.DELETE)
        addSum(row, COLUMN)
        print("INSERT")
        addPieChart(row, COLUMN, "Nombre d'insertions")
        addColumnChart(row,COLUMN, "Nombre d'insertions par jour", "Date", "Nombre d'insertions")

    elif name == options.DELETE:
        worksheet.write(row, colBase, 'Nombre de suppressions', bold)
        worksheet.write(row + 1, colBase, 'Auteur', bold)
        showByDate(row + 1, options.INSERTIONS)
        addSum(row, COLUMN)
        print("DELETE")
        addPieChart(row, COLUMN, 'Nombre de suppressions')
        addColumnChart(row,COLUMN, "Nombre de suppressions par jour", "Date", "Nombre de suppressions")




beginRow = 13

sendByDate(beginRow, options.COMMIT)
sendByDate(beginRow+15, options.DELETE)
sendByDate(beginRow+30, options.INSERTIONS)

workbook.close()