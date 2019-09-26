from datetime import *

DEV = "DEV"
DEBUG = "DEBUG"
REFACTOR = "REFACTOR"
TEST = "TEST"
OTHER = "OTHER"
NONE = "NONE"


 #Sprints pour la section 2
sprints = {
     1: {"begin": date(2019, 1, 1), "end": date(2019, 2, 5)},
     2: {"begin": date(2019, 2, 6), "end": date(2019, 2, 26)},
     3: {"begin": date(2019, 2, 27), "end": date(2019, 3, 26)},
     4: {"begin": date(2019, 3, 27), "end": date(2019, 4, 16)}
 }



config = {
    # Les codes utilisé dans les messages de commit pour spécifier la tâche
    'task_code':{
        'dev': ["[D]", "[Dev]", "[D/R]", "[dev]", "[DEV]"],
        'debug': ["debug", "[T & D]"],
        'test': ["[TESTS]", "[T]", "[Test]", "[test]", "[T & D]"],
        'refactor': ["Refactor", "[R & A]", "[D/R]", "[R]", ["refactor"], "[refactoring]", "[Refactoring]", "[Refactor]", "[correction]"],
        'lint': [""],
        'other': ["[A]", "[R & A]"]
    },

    # Seulement les commits compris dans la période de temps indiqués apparaîtront
    # Si la clé "begin" est absente, il n'y aura aucune limite inférieure
    # Si la clé "end" est absente, il n'y aura aucune limite supérieure
    'period':{
        'begin': date(2019,1,1),
        'end': date.today()
    },

    # Seulement les commits des auteurs dont le courriel est spécifié apparaîtront
    # Si la clé est absente, aucun filtrage ne sera effectué
    'authors':["ludovic.bedard@gmail.com",
               "jelavr@polymtl.ca",
               "tootmas@gmail.com",
               "sburwash@live.ca",
               "valiquettewilliam@gmail.com",
               "gasparfaure@hotmail.com",
               "jefflavallee123@live.ca",
               "ludovic.bedard@polymtl.ca",
               "macbookpro@service-WIFI-EDUROAM-PO-37-42.nat.polymtl.ca"
    ],

    # Seulemenet les commits des auteurs dont l'identificateur est spécifié apparaîtront
    # Si la clé est absente, aucun filtrage ne sera effectué
    # 'authors_id':[],

    # Seulement les commits des tâches spéficiées apparaîtront
    # Si la clé est absente, aucun filtrage ne sera effectué
    #'tasks': [DEV,DEBUG],


    # Pour déterminer si les commits de fusion de branches seront affichés
    'merge': False,

    # Pour identifier les id de commmits qu'on ne veut pas voir apparaître
    'forget': [
    ]


}
