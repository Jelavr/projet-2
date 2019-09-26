//tslint:disable

export class Models {

    public static airplane: any = {
        "metadata": {
            "version": 4.5,
            "type": "Object",
            "generator": "Object3D.toJSON",
        },
        "geometries": [
            {
                "uuid": "280717E1-71FE-4923-BDCD-C47C5A2C9E72",
                "type": "TorusBufferGeometry",
                "radius": 1,
                "tube": 0.4,
                "radialSegments": 8,
                "tubularSegments": 6,
                "arc": 6.283185,
            },
            {
                "uuid": "F0583425-0BDB-4608-8BF4-D32B25EB05B0",
                "type": "BoxBufferGeometry",
                "width": 1,
                "height": 1,
                "depth": 1,
                "widthSegments": 1,
                "heightSegments": 1,
                "depthSegments": 1
            },
            {
                "uuid": "9D6EE40C-5548-483B-B631-A7CC0F3846FF",
                "type": "BoxBufferGeometry",
                "width": 1,
                "height": 1,
                "depth": 1,
                "widthSegments": 1,
                "heightSegments": 1,
                "depthSegments": 1
            }],
        "materials": [
            {
                "uuid": "3AB8607F-F465-4FB3-90CF-AD24AF9D444F",
                "type": "MeshLambertMaterial",
                "color": 16777215,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "76A0B7A0-6D18-4C27-BD34-32B8860F1D5C",
                "type": "MeshStandardMaterial",
                "color": 16777215,
                "roughness": 0.5,
                "metalness": 0.5,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "BBEBD4ED-82B1-48D3-B792-6445075A3E92",
                "type": "MeshStandardMaterial",
                "color": 16777215,
                "roughness": 0.5,
                "metalness": 0.5,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            }],
        "object": {
            "uuid": "341D3650-1AAB-4C5D-9C0A-3D4310BD9E96",
            "type": "Scene",
            "name": "Scene",
            "layers": 1,
            "matrix": [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            "children": [
                {
                    "uuid": "C877F62E-4DF6-4AAB-A1C3-275493693636",
                    "type": "Mesh",
                    "name": "Torus",
                    "layers": 1,
                    "matrix": [1.697058, 0, 0, 0, 0, 0.435161, 0, 0, 0, 0, 17.688961, 0, 0, 0, 0, 1],
                    "geometry": "280717E1-71FE-4923-BDCD-C47C5A2C9E72",
                    "material": "3AB8607F-F465-4FB3-90CF-AD24AF9D444F",
                },
                {
                    "uuid": "0C2092D4-4E22-4A33-A574-A3949B87706A",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [7.536262, 0, -5.366154, 0, 0, 0.121719, 0, 0, 1.693893, 0, 2.378914, 0, -4.896292, 0.057519, 0.244029, 1],
                    "geometry": "F0583425-0BDB-4608-8BF4-D32B25EB05B0",
                    "material": "76A0B7A0-6D18-4C27-BD34-32B8860F1D5C",
                },
                {
                    "uuid": "60CFA685-BC90-41E6-AD75-4CD4CF5DDDDA",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [7.446882, 0.301082, 5.481254, 0, -0.001955, 0.121637, -0.004026, 0, -1.732199, 0.04996, 2.350637, 0, 4.482437, 0.039238, 0.157231, 1],
                    "geometry": "F0583425-0BDB-4608-8BF4-D32B25EB05B0",
                    "material": "76A0B7A0-6D18-4C27-BD34-32B8860F1D5C",
                },
                {
                    "uuid": "7BD048E9-C951-489F-A359-C9C4A984BF0F",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [0.055322, 0, 0, 0, 0, 3.605828, 1.333787, 0, 0, -0.96203, 2.600801, 0, 0.044471, 1.893429, 6.362912, 1],
                    "geometry": "9D6EE40C-5548-483B-B631-A7CC0F3846FF",
                    "material": "BBEBD4ED-82B1-48D3-B792-6445075A3E92",
                },
                {
                    "uuid": "39A82C68-0831-402C-80D0-DD044445818A",
                    "type": "Group",
                    "name": "Group",
                    "layers": 1,
                    "matrix": [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                }],
            "background": 11184810,
        },
    };

    public static ufo: any = {
        "metadata": {
            "version": 4.5,
            "type": "Object",
            "generator": "Object3D.toJSON"
        },
        "geometries": [
            {
                "uuid": "2A882E7A-C2C0-4D0F-A8D4-A74176A4FD75",
                "type": "SphereBufferGeometry",
                "radius": 1,
                "widthSegments": 8,
                "heightSegments": 6,
                "phiStart": 0,
                "phiLength": 6.283185,
                "thetaStart": 0,
                "thetaLength": 3.141593
            },
            {
                "uuid": "68887EBB-5E7A-4175-B41B-9D5434F564BB",
                "type": "SphereBufferGeometry",
                "radius": 1,
                "widthSegments": 8,
                "heightSegments": 6,
                "phiStart": 0,
                "phiLength": 6.283185,
                "thetaStart": 0,
                "thetaLength": 3.141593
            },
            {
                "uuid": "92AFC877-A37B-47F3-950D-776E82F58F5C",
                "type": "IcosahedronBufferGeometry",
                "radius": 1,
                "detail": 0
            },
            {
                "uuid": "F3FD3E49-DEBB-4C25-A029-E5FCDF1F4536",
                "type": "BoxBufferGeometry",
                "width": 1,
                "height": 1,
                "depth": 1,
                "widthSegments": 1,
                "heightSegments": 1,
                "depthSegments": 1,
            },
            {
                "uuid": "43A4B218-825D-4BE6-BDB5-F961524450AE",
                "type": "SphereBufferGeometry",
                "radius": 1,
                "widthSegments": 8,
                "heightSegments": 6,
                "phiStart": 0,
                "phiLength": 6.283185,
                "thetaStart": 0,
                "thetaLength": 3.141593,
            }],
        "materials": [
            {
                "uuid": "2ACF94CB-1A36-46F9-B97A-A56EEB546EE1",
                "type": "MeshLambertMaterial",
                "color": 12662721,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true,
            },
            {
                "uuid": "5047D214-E1C9-491D-8257-0CE8464B9556",
                "type": "MeshLambertMaterial",
                "color": 0,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true,
            },
            {
                "uuid": "13861B3B-DE8F-4488-A2AD-F7029E0D2B45",
                "type": "MeshStandardMaterial",
                "color": 65280,
                "roughness": 0.5,
                "metalness": 0.5,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true,
            },
            {
                "uuid": "5F8D08BD-79D0-4D4B-8C89-6130EFBD5483",
                "type": "MeshLambertMaterial",
                "color": 65280,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true,
            },
            {
                "uuid": "8D8726F2-3D47-4F47-82D2-D49418E5D65F",
                "type": "MeshLambertMaterial",
                "color": 65280,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true,
            },
            {
                "uuid": "F9EC0EB6-CACF-440C-BAFE-BFC703B697CA",
                "type": "MeshLambertMaterial",
                "color": 65280,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true,
            },
            {
                "uuid": "ADCB8967-6F23-42B4-ABEF-72061A5B353F",
                "type": "MeshLambertMaterial",
                "color": 16776960,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true,
            },
            {
                "uuid": "78661592-B23B-4A15-9FD3-B5482F8E094A",
                "type": "MeshLambertMaterial",
                "color": 16711680,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true,
            }],
        "object": {
            "uuid": "E0BDFE98-C175-4CF5-A037-FFBDB42BE692",
            "type": "Scene",
            "name": "Scene",
            "layers": 1,
            "matrix": [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            "children": [
                {
                    "uuid": "6993EDE8-A58F-40C0-9334-E6613D65DB3F",
                    "type": "Mesh",
                    "name": "Sphere",
                    "layers": 1,
                    "matrix": [3.253718, 0, 0, 0, 0, 0.610868, 0, 0, 0, 0, 3.707216, 0, 0, 2.854343, 0, 1],
                    "geometry": "2A882E7A-C2C0-4D0F-A8D4-A74176A4FD75",
                    "material": "2ACF94CB-1A36-46F9-B97A-A56EEB546EE1",
                },
                {
                    "uuid": "F19DC54D-AC90-4C91-B391-B24559E476F9",
                    "type": "Mesh",
                    "name": "Sphere",
                    "layers": 1,
                    "matrix": [1.172562, 0, 0, 0, 0, 0.866113, 0, 0, 0, 0, 1.172562, 0, 0, 3.414964, 0, 1],
                    "geometry": "68887EBB-5E7A-4175-B41B-9D5434F564BB",
                    "material": "5047D214-E1C9-491D-8257-0CE8464B9556",
                },
                {
                    "uuid": "65593431-7CB6-4F33-8A4D-8E87E4C32646",
                    "type": "Mesh",
                    "name": "Icosahedron",
                    "layers": 1,
                    "matrix": [0.142563, -0.086688, 0.115438, 0, 0, 0.115031, 0.086382, 0, -0.71153, -0.421935, 0.561869, 0, -1.281471, 2.104945, 1.287575, 1],
                    "geometry": "92AFC877-A37B-47F3-950D-776E82F58F5C",
                    "material": "13861B3B-DE8F-4488-A2AD-F7029E0D2B45",
                },
                {
                    "uuid": "527D3468-CD3E-4149-9F73-61F17ED62F87",
                    "type": "Mesh",
                    "name": "Icosahedron",
                    "layers": 1,
                    "matrix": [0.146947, -0.082217, -0.113189, 0, 0.079405, 0.118769, 0.016818, 0, 0.413221, -0.392615, 0.821646, 0, 1.04557, 2.104945, 1.554612, 1],
                    "geometry": "92AFC877-A37B-47F3-950D-776E82F58F5C",
                    "material": "5F8D08BD-79D0-4D4B-8C89-6130EFBD5483",
                },
                {
                    "uuid": "C61EF302-5EA8-454D-BBC1-4DD21595F215",
                    "type": "Mesh",
                    "name": "Icosahedron",
                    "layers": 1,
                    "matrix": [-0.163902, -0.082217, -0.086842, 0, -0.017594, 0.118769, -0.079237, 0, 0.576587, -0.392615, -0.71652, 0, 1.04557, 2.104945, -1.72738, 1],
                    "geometry": "92AFC877-A37B-47F3-950D-776E82F58F5C",
                    "material": "8D8726F2-3D47-4F47-82D2-D49418E5D65F",
                },
                {
                    "uuid": "C4FB9225-5D2C-441E-8B96-851E5740802B",
                    "type": "Mesh",
                    "name": "Icosahedron",
                    "layers": 1,
                    "matrix": [-0.129377, -0.082868, 0.132511, 0, -0.081657, 0.118292, -0.00575, 0, -0.520733, -0.396222, -0.756205, 0, -1.471695, 2.104945, -1.72738, 1],
                    "geometry": "92AFC877-A37B-47F3-950D-776E82F58F5C",
                    "material": "F9EC0EB6-CACF-440C-BAFE-BFC703B697CA",
                },
                {
                    "uuid": "E817D0BE-FBC9-4350-B45A-D3D4C0AB7A64",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [0.057163, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0.090551, 0, 0, 4.758578, 0, 1],
                    "geometry": "F3FD3E49-DEBB-4C25-A029-E5FCDF1F4536",
                    "material": "ADCB8967-6F23-42B4-ABEF-72061A5B353F",
                },
                {
                    "uuid": "3677A303-112B-43F9-94D2-01F0AD7E4A5E",
                    "type": "Mesh",
                    "name": "Sphere",
                    "layers": 1,
                    "matrix": [0.162203, 0, 0, 0, 0, 0.191361, 0, 0, 0, 0, 0.191174, 0, 0, 5.416952, 0, 1],
                    "geometry": "43A4B218-825D-4BE6-BDB5-F961524450AE",
                    "material": "78661592-B23B-4A15-9FD3-B5482F8E094A",
                }],
            "background": 11184810,
        },
    };

    public static xWing: any = {
        "metadata": {
            "version": 4.5,
            "type": "Object",
            "generator": "Object3D.toJSON"
        },
        "geometries": [
            {
                "uuid": "FD501C36-E485-434D-97BE-AF50C33BA4FF",
                "type": "CylinderBufferGeometry",
                "radiusTop": 1,
                "radiusBottom": 1,
                "height": 1,
                "radialSegments": 8,
                "heightSegments": 1,
                "openEnded": false,
                "thetaStart": 0,
                "thetaLength": 6.283185
            },
            {
                "uuid": "CAC101E7-C527-422F-BED3-2817D4B5C2D2",
                "type": "SphereBufferGeometry",
                "radius": 1,
                "widthSegments": 8,
                "heightSegments": 6,
                "phiStart": 0,
                "phiLength": 6.283185,
                "thetaStart": 0,
                "thetaLength": 3.141593
            },
            {
                "uuid": "52F98230-0836-47F8-909D-3D4049AA279C",
                "type": "BoxBufferGeometry",
                "width": 1,
                "height": 1,
                "depth": 1,
                "widthSegments": 1,
                "heightSegments": 1,
                "depthSegments": 1
            },
            {
                "uuid": "432FD2E3-D787-4120-816B-DA034CD1C685",
                "type": "BoxBufferGeometry",
                "width": 1,
                "height": 1,
                "depth": 1,
                "widthSegments": 1,
                "heightSegments": 1,
                "depthSegments": 1
            },
            {
                "uuid": "DFEFA539-80A8-42EA-B977-2D4F049CBAA7",
                "type": "CylinderBufferGeometry",
                "radiusTop": 1,
                "radiusBottom": 1,
                "height": 1,
                "radialSegments": 8,
                "heightSegments": 1,
                "openEnded": false,
                "thetaStart": 0,
                "thetaLength": 6.283185
            },
            {
                "uuid": "CB013D52-75C9-42C4-B1BF-4E2EF984CB97",
                "type": "CylinderBufferGeometry",
                "radiusTop": 1,
                "radiusBottom": 1,
                "height": 1,
                "radialSegments": 8,
                "heightSegments": 1,
                "openEnded": false,
                "thetaStart": 0,
                "thetaLength": 6.283185
            },
            {
                "uuid": "57BAAD72-79B2-431D-89D6-702BDB9CAA5B",
                "type": "CylinderBufferGeometry",
                "radiusTop": 1,
                "radiusBottom": 1,
                "height": 1,
                "radialSegments": 8,
                "heightSegments": 1,
                "openEnded": false,
                "thetaStart": 0,
                "thetaLength": 6.283185
            },
            {
                "uuid": "7B7ADE0B-338B-4D47-B851-8FF0E9282FC2",
                "type": "CylinderBufferGeometry",
                "radiusTop": 1,
                "radiusBottom": 1,
                "height": 1,
                "radialSegments": 8,
                "heightSegments": 1,
                "openEnded": false,
                "thetaStart": 0,
                "thetaLength": 6.283185
            }],
        "materials": [
            {
                "uuid": "6AC7411A-F53B-4B1F-92B4-CA6C4AAA4156",
                "type": "MeshStandardMaterial",
                "color": 16711680,
                "roughness": 0.5,
                "metalness": 0.5,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "9874BC89-D43B-43B1-9140-4871765474FB",
                "type": "MeshStandardMaterial",
                "color": 16711680,
                "roughness": 0.5,
                "metalness": 0.5,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "8BDBC719-999A-46C8-B0FF-91696C255317",
                "type": "MeshStandardMaterial",
                "color": 16512,
                "roughness": 0.5,
                "metalness": 0.5,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "06151F05-7BAF-4D3D-808C-1458144FDBEF",
                "type": "MeshStandardMaterial",
                "color": 16512,
                "roughness": 0.5,
                "metalness": 0.5,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "EE93BC1F-F4A7-4542-9CB3-47D3CEF868F6",
                "type": "MeshStandardMaterial",
                "color": 0,
                "roughness": 0.5,
                "metalness": 0.5,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "ED774D4F-6877-496C-9014-D62B4794F164",
                "type": "MeshStandardMaterial",
                "color": 0,
                "roughness": 0.5,
                "metalness": 0.5,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "A5E101A2-E22D-4F08-B149-C5534C3E6E7D",
                "type": "MeshStandardMaterial",
                "color": 0,
                "roughness": 0.5,
                "metalness": 0.5,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "2C969424-2924-41F2-8976-DBF3749EDF3B",
                "type": "MeshStandardMaterial",
                "color": 0,
                "roughness": 0.5,
                "metalness": 0.5,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            }],
        "object": {
            "uuid": "31517222-A9A7-4EAF-B5F6-60751C0BABA3",
            "type": "Scene",
            "name": "Scene",
            "layers": 1,
            "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
            "children": [
                {
                    "uuid": "FDD26744-756B-4FA9-A1E0-E09D104548BC",
                    "type": "Mesh",
                    "name": "Cylinder",
                    "layers": 1,
                    "matrix": [1.49493,0,0,0,0,0,-11.320718,0,0,1.289492,0,0,0,2.538819,0,1],
                    "geometry": "FD501C36-E485-434D-97BE-AF50C33BA4FF",
                    "material": "6AC7411A-F53B-4B1F-92B4-CA6C4AAA4156"
                },
                {
                    "uuid": "B7B6D2D1-A0E0-4E7A-84D6-79A969AA27E6",
                    "type": "Mesh",
                    "name": "Sphere",
                    "layers": 1,
                    "matrix": [1.495058,0,0,0,0,1.360213,0,0,0,0,5.450027,0,0,2.515347,4.867265,1],
                    "geometry": "CAC101E7-C527-422F-BED3-2817D4B5C2D2",
                    "material": "9874BC89-D43B-43B1-9140-4871765474FB"
                },
                {
                    "uuid": "52D97ED7-312C-40D9-AD25-65F9EAAACD55",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [0.1,-0.173205,0,0,17.320508,10,0,0,0,0,13,0,0,2.651568,0,1],
                    "geometry": "52F98230-0836-47F8-909D-3D4049AA279C",
                    "material": "8BDBC719-999A-46C8-B0FF-91696C255317"
                },
                {
                    "uuid": "0847B633-38E6-40C0-987B-581F871A3E9C",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [0.1,0.173205,0,0,-17.320508,10,0,0,0,0,13,0,0,2.431673,0.072309,1],
                    "geometry": "432FD2E3-D787-4120-816B-DA034CD1C685",
                    "material": "06151F05-7BAF-4D3D-808C-1458144FDBEF"
                },
                {
                    "uuid": "7E15AE9A-CBCC-4D09-822F-0712B8F5B4C7",
                    "type": "Mesh",
                    "name": "Cylinder",
                    "layers": 1,
                    "matrix": [0.2,0,0,0,0,0,15,0,0,-0.2,0,0,-8.603807,7.42398,1,1],
                    "geometry": "DFEFA539-80A8-42EA-B977-2D4F049CBAA7",
                    "material": "EE93BC1F-F4A7-4542-9CB3-47D3CEF868F6"
                },
                {
                    "uuid": "C53365AC-315D-4B50-9702-A7B7C9D11D03",
                    "type": "Mesh",
                    "name": "Cylinder",
                    "layers": 1,
                    "matrix": [0.2,0,0,0,0,0,15,0,0,-0.2,0,0,8.541491,7.501587,1,1],
                    "geometry": "CB013D52-75C9-42C4-B1BF-4E2EF984CB97",
                    "material": "ED774D4F-6877-496C-9014-D62B4794F164"
                },
                {
                    "uuid": "2C7D10B8-6A38-4AF0-9CA1-82865A95BDDB",
                    "type": "Mesh",
                    "name": "Cylinder",
                    "layers": 1,
                    "matrix": [0.2,0,0,0,0,0,15,0,0,-0.2,0,0,-8.426405,-2.146829,1,1],
                    "geometry": "57BAAD72-79B2-431D-89D6-702BDB9CAA5B",
                    "material": "A5E101A2-E22D-4F08-B149-C5534C3E6E7D"
                },
                {
                    "uuid": "8910188D-7568-458D-B09E-DE583CC5764B",
                    "type": "Mesh",
                    "name": "Cylinder",
                    "layers": 1,
                    "matrix": [0.2,0,0,0,0,0,15,0,0,-0.2,0,0,8.556976,-2.516555,1,1],
                    "geometry": "7B7ADE0B-338B-4D47-B851-8FF0E9282FC2",
                    "material": "2C969424-2924-41F2-8976-DBF3749EDF3B"
                }],
            "background": 11184810
        }
    };

    public static manWithBalloon: any = {
        "metadata": {
            "version": 4.5,
            "type": "Object",
            "generator": "Object3D.toJSON"
        },
        "geometries": [
            {
                "uuid": "8F87B8A3-0176-4FB4-B5F5-27EC76273AE3",
                "type": "CylinderBufferGeometry",
                "radiusTop": 1,
                "radiusBottom": 1,
                "height": 1,
                "radialSegments": 8,
                "heightSegments": 1,
                "openEnded": false,
                "thetaStart": 0,
                "thetaLength": 6.283185
            },
            {
                "uuid": "10364203-7B94-474B-88F4-994CD744E76C",
                "type": "CylinderBufferGeometry",
                "radiusTop": 1,
                "radiusBottom": 1,
                "height": 1,
                "radialSegments": 8,
                "heightSegments": 1,
                "openEnded": false,
                "thetaStart": 0,
                "thetaLength": 6.283185
            },
            {
                "uuid": "59CB964D-1A91-4368-8333-86E7AA6660DA",
                "type": "CylinderBufferGeometry",
                "radiusTop": 1,
                "radiusBottom": 1,
                "height": 1,
                "radialSegments": 8,
                "heightSegments": 1,
                "openEnded": false,
                "thetaStart": 0,
                "thetaLength": 6.283185
            },
            {
                "uuid": "81459871-2F00-4182-99AD-937EB28B9E25",
                "type": "CylinderBufferGeometry",
                "radiusTop": 1,
                "radiusBottom": 1,
                "height": 1,
                "radialSegments": 8,
                "heightSegments": 1,
                "openEnded": false,
                "thetaStart": 0,
                "thetaLength": 6.283185
            },
            {
                "uuid": "F335E550-0388-465D-930A-1164D56CE553",
                "type": "SphereBufferGeometry",
                "radius": 1,
                "widthSegments": 8,
                "heightSegments": 6,
                "phiStart": 0,
                "phiLength": 6.283185,
                "thetaStart": 0,
                "thetaLength": 3.141593
            },
            {
                "uuid": "F2282EAA-A22B-497A-ACA3-C2665A73DCB1",
                "type": "SphereBufferGeometry",
                "radius": 1,
                "widthSegments": 8,
                "heightSegments": 6,
                "phiStart": 0,
                "phiLength": 6.283185,
                "thetaStart": 0,
                "thetaLength": 3.141593
            },
            {
                "uuid": "387EC54F-160D-4DC4-94CC-B0C1E496FB77",
                "type": "CylinderBufferGeometry",
                "radiusTop": 1,
                "radiusBottom": 1,
                "height": 1,
                "radialSegments": 8,
                "heightSegments": 1,
                "openEnded": false,
                "thetaStart": 0,
                "thetaLength": 6.283185
            },
            {
                "uuid": "B5872B38-8C42-4557-AAF8-2E7ABD5388F2",
                "type": "CylinderBufferGeometry",
                "radiusTop": 1,
                "radiusBottom": 1,
                "height": 1,
                "radialSegments": 8,
                "heightSegments": 1,
                "openEnded": false,
                "thetaStart": 0,
                "thetaLength": 6.283185
            }],
        "materials": [
            {
                "uuid": "212AD1B2-B363-414E-BF5E-48DC454E09B0",
                "type": "MeshLambertMaterial",
                "color": 255,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "9FA81284-6D9A-4DA9-B0F6-CE1510A54D34",
                "type": "MeshLambertMaterial",
                "color": 255,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "C4A366B1-3664-4356-866B-194465496BA1",
                "type": "MeshLambertMaterial",
                "color": 16744640,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "991ED9D9-4265-4F33-8365-BE68D30FCAB1",
                "type": "MeshLambertMaterial",
                "color": 16744640,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "A5A44906-9C69-4D37-A52D-3F83C1007ED4",
                "type": "MeshLambertMaterial",
                "color": 16744640,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "4693C9F3-0C5A-49FA-8B53-B6ECA257E2C7",
                "type": "MeshLambertMaterial",
                "color": 16711680,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "715A12B2-327F-4DC6-903F-ACDC3E772F85",
                "type": "MeshLambertMaterial",
                "color": 16776960,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "BD094BFB-D1F1-45B9-B808-097E738649FD",
                "type": "MeshLambertMaterial",
                "color": 128,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            }],
        "object": {
            "uuid": "CEA4E06B-119A-4655-916D-B7F7DC91404C",
            "type": "Scene",
            "name": "Scene",
            "layers": 1,
            "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
            "children": [
                {
                    "uuid": "D5512E84-25DA-408C-B45C-5B72832203BC",
                    "type": "Mesh",
                    "name": "Cylinder",
                    "layers": 1,
                    "matrix": [0.166768,0,0,0,0,3.171588,1.480213,0,0,-0.124535,0.266836,0,0.021339,0.642482,0.311958,1],
                    "geometry": "8F87B8A3-0176-4FB4-B5F5-27EC76273AE3",
                    "material": "212AD1B2-B363-414E-BF5E-48DC454E09B0"
                },
                {
                    "uuid": "0E18E4C8-B3D2-4558-A609-E003BB35D785",
                    "type": "Mesh",
                    "name": "Cylinder",
                    "layers": 1,
                    "matrix": [0.176347,0,0,0,0,3.172077,-1.479164,0,0,0.127056,0.272472,0,0.008539,0.692011,1.717683,1],
                    "geometry": "10364203-7B94-474B-88F4-994CD744E76C",
                    "material": "9FA81284-6D9A-4DA9-B0F6-CE1510A54D34"
                },
                {
                    "uuid": "3C48629C-E171-4090-B980-CB71F6FED39A",
                    "type": "Mesh",
                    "name": "Cylinder",
                    "layers": 1,
                    "matrix": [0.19407,0,0,0,0,3.735578,0,0,0,0,0.387521,0,0,3.565167,1.033855,1],
                    "geometry": "59CB964D-1A91-4368-8333-86E7AA6660DA",
                    "material": "C4A366B1-3664-4356-866B-194465496BA1"
                },
                {
                    "uuid": "E60DB5DE-BD9F-4A6E-8149-EA7056D736B5",
                    "type": "Mesh",
                    "name": "Cylinder",
                    "layers": 1,
                    "matrix": [0.09964,0,0,0,0,0.01019,4.993302,0,0,0.274714,-0.000561,0,0,4.367944,1.031975,1],
                    "geometry": "81459871-2F00-4182-99AD-937EB28B9E25",
                    "material": "991ED9D9-4265-4F33-8365-BE68D30FCAB1"
                },
                {
                    "uuid": "6D00C00D-DC77-4701-B3CC-F135430D5F96",
                    "type": "Mesh",
                    "name": "Sphere",
                    "layers": 1,
                    "matrix": [0.829014,0,0,0,0,0.714206,0,0,0,0,0.714958,0,0,5.977646,0.976092,1],
                    "geometry": "F335E550-0388-465D-930A-1164D56CE553",
                    "material": "A5A44906-9C69-4D37-A52D-3F83C1007ED4"
                },
                {
                    "uuid": "B6B1DE4F-0C15-41B3-B3F1-3A45608F0346",
                    "type": "Mesh",
                    "name": "Sphere",
                    "layers": 1,
                    "matrix": [1,0,0,0,0,1.824371,0,0,0,0,1,0,-0.052134,8.736983,-0.735628,1],
                    "geometry": "F2282EAA-A22B-497A-ACA3-C2665A73DCB1",
                    "material": "4693C9F3-0C5A-49FA-8B53-B6ECA257E2C7"
                },
                {
                    "uuid": "C386287A-E780-4E85-A9A7-C16B0338CFEC",
                    "type": "Mesh",
                    "name": "Cylinder",
                    "layers": 1,
                    "matrix": [0.001109,0,0,0,0,5.347222,0,0,0,0,0.044144,0,0.015766,7.003947,-0.874391,1],
                    "geometry": "387EC54F-160D-4DC4-94CC-B0C1E496FB77",
                    "material": "715A12B2-327F-4DC6-903F-ACDC3E772F85"
                },
                {
                    "uuid": "429534E4-5C11-4FA9-BBCF-D690473FCB9D",
                    "type": "Mesh",
                    "name": "Cylinder",
                    "layers": 1,
                    "matrix": [0.42695,0,0,0,0,3.455026,0,0,0,0,0.424295,0,0,3.005842,1.071381,1],
                    "geometry": "B5872B38-8C42-4557-AAF8-2E7ABD5388F2",
                    "material": "BD094BFB-D1F1-45B9-B808-097E738649FD"
                }],
            "background": 11184810
        }
    };

    public static hotAirBalloon: any = {
        "metadata": {
            "version": 4.5,
            "type": "Object",
            "generator": "Object3D.toJSON"
        },
        "geometries": [
            {
                "uuid": "0D9C31F1-EFAB-4664-921B-FF7C5F1EB937",
                "type": "BoxBufferGeometry",
                "width": 1,
                "height": 1,
                "depth": 1,
                "widthSegments": 1,
                "heightSegments": 1,
                "depthSegments": 1
            },
            {
                "uuid": "3CAE3806-30C2-4AE9-9F4F-1C20FA757234",
                "type": "BoxBufferGeometry",
                "width": 1,
                "height": 1,
                "depth": 1,
                "widthSegments": 1,
                "heightSegments": 1,
                "depthSegments": 1
            },
            {
                "uuid": "EA7CA3DB-7461-4774-B421-FD75E08142F1",
                "type": "SphereBufferGeometry",
                "radius": 1,
                "widthSegments": 8,
                "heightSegments": 6,
                "phiStart": 0,
                "phiLength": 6.283185,
                "thetaStart": 0,
                "thetaLength": 3.141593
            },
            {
                "uuid": "2368EB44-8491-4C46-BCB0-2B1CA76E2A09",
                "type": "SphereBufferGeometry",
                "radius": 1,
                "widthSegments": 8,
                "heightSegments": 6,
                "phiStart": 0,
                "phiLength": 6.283185,
                "thetaStart": 0,
                "thetaLength": 3.141593
            },
            {
                "uuid": "1C63051B-0A25-491F-86F7-15C73002CBC0",
                "type": "BoxBufferGeometry",
                "width": 1,
                "height": 1,
                "depth": 1,
                "widthSegments": 1,
                "heightSegments": 1,
                "depthSegments": 1
            },
            {
                "uuid": "BE6C5916-B387-4BDA-951E-20E7F85C8741",
                "type": "BoxBufferGeometry",
                "width": 1,
                "height": 1,
                "depth": 1,
                "widthSegments": 1,
                "heightSegments": 1,
                "depthSegments": 1
            }],
        "materials": [
            {
                "uuid": "A24FEE9A-219F-4F3D-9848-CA8B7288CE8F",
                "type": "MeshStandardMaterial",
                "color": 255,
                "roughness": 0.5,
                "metalness": 0.5,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "241C7D87-7C79-4355-8DCE-4295FF8F66C0",
                "type": "MeshLambertMaterial",
                "color": 16777088,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "504DDD19-6A10-4F7C-B8B1-16F9D3F7D46C",
                "type": "MeshLambertMaterial",
                "color": 16711680,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "4F9353BB-B35A-459B-A924-E4141B828781",
                "type": "MeshLambertMaterial",
                "color": 16777215,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "EAF10B3C-8C5C-4E8E-9A81-425F8FF75B16",
                "type": "MeshLambertMaterial",
                "color": 8454016,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "9149856F-F574-4F54-8959-289E07FA70C9",
                "type": "MeshStandardMaterial",
                "color": 16777215,
                "roughness": 0.5,
                "metalness": 0.5,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            }],
        "object": {
            "uuid": "3C923B9C-A4BB-4A45-A622-F0EA35CB3C35",
            "type": "Scene",
            "name": "Scene",
            "layers": 1,
            "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
            "children": [
                {
                    "uuid": "0CF77C82-39ED-4212-900F-FB5807E82E49",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [-0.076744,0,0,0,0,1.86494,0,0,0,0,0.06999,0,-0.502107,1.216614,0.496829,1],
                    "geometry": "0D9C31F1-EFAB-4664-921B-FF7C5F1EB937",
                    "material": "A24FEE9A-219F-4F3D-9848-CA8B7288CE8F"
                },
                {
                    "uuid": "538C820C-4C54-4999-A93E-CF81A00DDAC8",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [1.115097,0,0,0,0,0.589501,0,0,0,0,1.077464,0,0,0,0,1],
                    "geometry": "3CAE3806-30C2-4AE9-9F4F-1C20FA757234",
                    "material": "241C7D87-7C79-4355-8DCE-4295FF8F66C0"
                },
                {
                    "uuid": "D59DF3A3-67C5-44D8-9CD0-7D75B8C218F1",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [-0.076744,0,0,0,0,1.86494,0,0,0,0,0.06999,0,0.513852,1.219718,0.496829,1],
                    "geometry": "0D9C31F1-EFAB-4664-921B-FF7C5F1EB937",
                    "material": "A24FEE9A-219F-4F3D-9848-CA8B7288CE8F"
                },
                {
                    "uuid": "3256159D-7AE5-4CD1-BF8C-DC0C8F14F89A",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [-0.076744,0,0,0,0,1.86494,0,0,0,0,0.06999,0,0.513852,1.219718,-0.500973,1],
                    "geometry": "0D9C31F1-EFAB-4664-921B-FF7C5F1EB937",
                    "material": "A24FEE9A-219F-4F3D-9848-CA8B7288CE8F"
                },
                {
                    "uuid": "42690B1F-B7AF-4AEF-9780-2DBB83BE3015",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [-0.076744,0,0,0,0,1.86494,0,0,0,0,0.06999,0,-0.502107,1.216614,-0.47546,1],
                    "geometry": "0D9C31F1-EFAB-4664-921B-FF7C5F1EB937",
                    "material": "A24FEE9A-219F-4F3D-9848-CA8B7288CE8F"
                },
                {
                    "uuid": "A9D24729-CD4A-473B-A6E5-72E1131B9050",
                    "type": "Mesh",
                    "name": "Sphere",
                    "layers": 1,
                    "matrix": [2.158351,0,0,0,0,2.332278,0,0,0,0,2.01277,0,0.019614,4.087486,0.031172,1],
                    "geometry": "EA7CA3DB-7461-4774-B421-FD75E08142F1",
                    "material": "504DDD19-6A10-4F7C-B8B1-16F9D3F7D46C"
                },
                {
                    "uuid": "BB52A450-8AD8-41B0-9393-E06A46ADE779",
                    "type": "Mesh",
                    "name": "Sphere",
                    "layers": 1,
                    "matrix": [0.189179,0,0,0,0,0.203118,0,0,0,0,0.177759,0,0.026452,0.836577,0.015997,1],
                    "geometry": "2368EB44-8491-4C46-BCB0-2B1CA76E2A09",
                    "material": "4F9353BB-B35A-459B-A924-E4141B828781"
                },
                {
                    "uuid": "7402D9B5-2EE7-4079-A22B-743D5F8F43F4",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [0.224345,0,0,0,0,0.603945,0,0,0,0,0.291003,0,0.020403,0.358257,0.02598,1],
                    "geometry": "1C63051B-0A25-491F-86F7-15C73002CBC0",
                    "material": "EAF10B3C-8C5C-4E8E-9A81-425F8FF75B16"
                },
                {
                    "uuid": "822D08B2-3878-44A8-8C17-BA9CA3B54DE6",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [0.056662,0,0,0,0,0.320476,0,0,0,0,0.068533,0,0.024212,0.489729,0.20337,1],
                    "geometry": "BE6C5916-B387-4BDA-951E-20E7F85C8741",
                    "material": "9149856F-F574-4F54-8959-289E07FA70C9"
                },
                {
                    "uuid": "989C7836-D2DB-4039-8836-4B2B7D894FAD",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [0.056662,0,0,0,0,0.320476,0,0,0,0,0.068533,0,0.00779,0.486543,-0.14532,1],
                    "geometry": "BE6C5916-B387-4BDA-951E-20E7F85C8741",
                    "material": "9149856F-F574-4F54-8959-289E07FA70C9"
                },
                {
                    "uuid": "BB7CFA47-2EF1-4E92-BEC3-100AA4CC91CA",
                    "type": "Group",
                    "name": "Group",
                    "layers": 1,
                    "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
                }],
            "background": 11184810
        }
    };

    public static helicopter: any = {
        "metadata": {
            "version": 4.5,
            "type": "Object",
            "generator": "Object3D.toJSON"
        },
        "geometries": [
            {
                "uuid": "00CCA277-0B65-4566-9A6A-1F5C743B8D80",
                "type": "BoxBufferGeometry",
                "width": 1,
                "height": 1,
                "depth": 1,
                "widthSegments": 1,
                "heightSegments": 1,
                "depthSegments": 1
            },
            {
                "uuid": "A0FB0CEC-6687-45AA-8109-A2A7D222B364",
                "type": "BoxBufferGeometry",
                "width": 1,
                "height": 1,
                "depth": 1,
                "widthSegments": 1,
                "heightSegments": 1,
                "depthSegments": 1
            },
            {
                "uuid": "8205CB69-7B6A-4CCD-8BE1-D601786A9EF0",
                "type": "IcosahedronBufferGeometry",
                "radius": 1,
                "detail": 0
            },
            {
                "uuid": "926F249D-8146-4C66-92E4-0C7311D6701D",
                "type": "LatheBufferGeometry",
                "points": [
                    {
                        "x": 0,
                        "y": 0
                    },
                    {
                        "x": 0.4,
                        "y": 0
                    },
                    {
                        "x": 0.35,
                        "y": 0.05
                    },
                    {
                        "x": 0.1,
                        "y": 0.075
                    },
                    {
                        "x": 0.08,
                        "y": 0.1
                    },
                    {
                        "x": 0.08,
                        "y": 0.4
                    },
                    {
                        "x": 0.1,
                        "y": 0.42
                    },
                    {
                        "x": 0.14,
                        "y": 0.48
                    },
                    {
                        "x": 0.2,
                        "y": 0.5
                    },
                    {
                        "x": 0.25,
                        "y": 0.54
                    },
                    {
                        "x": 0.3,
                        "y": 1.2
                    }],
                "segments": 12,
                "phiStart": 0,
                "phiLength": 6.283185
            },
            {
                "uuid": "B81BC372-3C82-434A-AAEC-A16D4411C685",
                "type": "BoxBufferGeometry",
                "width": 1,
                "height": 1,
                "depth": 1,
                "widthSegments": 1,
                "heightSegments": 1,
                "depthSegments": 1
            },
            {
                "uuid": "A8C3A470-0763-4DFC-9446-ABA6176B2AD6",
                "type": "BoxBufferGeometry",
                "width": 1,
                "height": 1,
                "depth": 1,
                "widthSegments": 1,
                "heightSegments": 1,
                "depthSegments": 1
            },
            {
                "uuid": "68B34E9B-C853-4551-8F99-D74DF3F955E5",
                "type": "BoxBufferGeometry",
                "width": 1,
                "height": 1,
                "depth": 1,
                "widthSegments": 1,
                "heightSegments": 1,
                "depthSegments": 1
            },
            {
                "uuid": "9BEE6E28-BF9C-4B9D-AE67-5C02645F3E2D",
                "type": "SphereBufferGeometry",
                "radius": 1,
                "widthSegments": 8,
                "heightSegments": 6,
                "phiStart": 0,
                "phiLength": 6.283185,
                "thetaStart": 0,
                "thetaLength": 3.141593
            }],
        "materials": [
            {
                "uuid": "FD77D090-32CF-4999-8927-5AAC7BAA6C08",
                "type": "MeshLambertMaterial",
                "color": 0,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "FD8780E5-C819-49F6-98CF-12FF3355F090",
                "type": "MeshLambertMaterial",
                "color": 0,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "98098D1D-4E7F-46B9-8A5C-49E110E04B50",
                "type": "MeshLambertMaterial",
                "color": 40704,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "4A4C8794-0D26-4DC3-B555-32ECB0F947F7",
                "type": "MeshLambertMaterial",
                "color": 16711680,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "F9AA88F5-2460-48E4-B326-A108694B9758",
                "type": "MeshLambertMaterial",
                "color": 16776960,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "6CF266D4-127D-4B9A-BD0F-FAD17ACC7576",
                "type": "MeshLambertMaterial",
                "color": 32768,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "46F2C484-4CF1-4454-B37C-C6CA43E431BF",
                "type": "MeshLambertMaterial",
                "color": 65280,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "F547018F-29F3-42A4-B8D7-20F7997E2A1F",
                "type": "MeshLambertMaterial",
                "color": 32768,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "9A1F1332-6124-4D0A-A699-86CB76A835FA",
                "type": "MeshLambertMaterial",
                "color": 0,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "BBCA626C-7519-402C-8A0E-C8259B1B01C7",
                "type": "MeshLambertMaterial",
                "color": 16776960,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            }],
        "object": {
            "uuid": "E0BDFE98-C175-4CF5-A037-FFBDB42BE692",
            "type": "Scene",
            "name": "Scene",
            "layers": 1,
            "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
            "children": [
                {
                    "uuid": "F4ACF0F9-4C0C-438E-9D0B-85F8330E826C",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [19.275442,0,0,0,0,0.132474,0,0,0,0,0.848541,0,0,3.293178,0,1],
                    "geometry": "00CCA277-0B65-4566-9A6A-1F5C743B8D80",
                    "material": "FD77D090-32CF-4999-8927-5AAC7BAA6C08"
                },
                {
                    "uuid": "0AA05891-36E4-4BE6-9C3F-B2B9655DB0EC",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [-6.672305,0,15.867056,0,0,0.132474,0,0,-0.782196,0,-0.328924,0,0,3.303358,0,1],
                    "geometry": "00CCA277-0B65-4566-9A6A-1F5C743B8D80",
                    "material": "FD8780E5-C819-49F6-98CF-12FF3355F090"
                },
                {
                    "uuid": "F00478E1-B1A2-4E0A-B2A7-F03244DD579A",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [4.963423,0,-3.401229,0,0,1.415973,0,0,0.74597,0,1.088595,0,-0.078068,1.550251,-0.146541,1],
                    "geometry": "A0FB0CEC-6687-45AA-8109-A2A7D222B364",
                    "material": "98098D1D-4E7F-46B9-8A5C-49E110E04B50"
                },
                {
                    "uuid": "ACC784AC-2DEA-460A-8D0F-FA41BC7CB315",
                    "type": "Mesh",
                    "name": "Icosahedron",
                    "layers": 1,
                    "matrix": [1.619755,0,-1.074709,0,0,1.240167,0,0,0.748466,0,1.128056,0,2.252206,1.411292,-1.747358,1],
                    "geometry": "8205CB69-7B6A-4CCD-8BE1-D601786A9EF0",
                    "material": "4A4C8794-0D26-4DC3-B555-32ECB0F947F7"
                },
                {
                    "uuid": "ED24F6E1-302E-4398-A29B-09886C5C6326",
                    "type": "Mesh",
                    "name": "Lathe",
                    "layers": 1,
                    "matrix": [0.617624,-0.020183,0.786215,0,-0.054146,-1.347074,0.007955,0,1.742208,-0.078123,-1.370624,0,-0.021112,3.566834,0.025916,1],
                    "geometry": "926F249D-8146-4C66-92E4-0C7311D6701D",
                    "material": "F9AA88F5-2460-48E4-B326-A108694B9758"
                },
                {
                    "uuid": "2B16D386-BAFC-4E44-A04C-CED22A3F6D03",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [6.544659,-0.04984,-4.374554,0,0.284088,0.354219,0.420981,0,0.225228,-0.589078,0.343669,0,-4.684427,1.711243,3.048107,1],
                    "geometry": "B81BC372-3C82-434A-AAEC-A16D4411C685",
                    "material": "6CF266D4-127D-4B9A-BD0F-FAD17ACC7576"
                },
                {
                    "uuid": "949BBBD1-AEAA-4B70-BA67-291CAC0174BA",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [-1.892556,0.102393,-2.772786,0,-0.488089,-0.050475,0.331279,0,-0.004991,0.093221,0.006849,0,-5.150688,1.722922,3.392901,1],
                    "geometry": "A8C3A470-0763-4DFC-9446-ABA6176B2AD6",
                    "material": "46F2C484-4CF1-4454-B37C-C6CA43E431BF"
                },
                {
                    "uuid": "ED3C41D1-35A7-41F0-8042-6A01BE495B2E",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [-1.035287,3.121604,0.681442,0,0.459632,0.218481,-0.302537,0,-0.051464,0,-0.078188,0,-7.60554,2.424746,5.043997,1],
                    "geometry": "A8C3A470-0763-4DFC-9446-ABA6176B2AD6",
                    "material": "F547018F-29F3-42A4-B8D7-20F7997E2A1F"
                },
                {
                    "uuid": "3666681F-D607-43BD-86DD-0FB3B6A771D5",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [-0.673131,-2.57471,0.472991,0,-0.098128,-0.00618,-0.173291,0,0.14822,-0.053817,-0.082012,0,-7.57009,1.820639,4.507488,1],
                    "geometry": "68B34E9B-C853-4551-8F99-D74DF3F955E5",
                    "material": "9A1F1332-6124-4D0A-A699-86CB76A835FA"
                },
                {
                    "uuid": "471727AC-AF33-4395-9C2B-DAF7D528EC08",
                    "type": "Mesh",
                    "name": "Sphere",
                    "layers": 1,
                    "matrix": [0.204917,0.060261,-0.010081,0,-0.060992,0.199674,-0.046197,0,-0.003606,0.047146,0.208538,0,-7.618262,1.69121,4.436847,1],
                    "geometry": "9BEE6E28-BF9C-4B9D-AE67-5C02645F3E2D",
                    "material": "BBCA626C-7519-402C-8A0E-C8259B1B01C7"
                }],
            "background": 11184810
        }
    };

    public static cloud: any = {
        "metadata": {
            "version": 4.5,
            "type": "Object",
            "generator": "Object3D.toJSON"
        },
        "geometries": [
            {
                "uuid": "69D096FA-2934-4764-AEF4-53E937B58416",
                "type": "TorusKnotBufferGeometry",
                "radius": 1,
                "tube": 0.4,
                "tubularSegments": 64,
                "radialSegments": 8,
                "p": 2,
                "q": 3
            },
            {
                "uuid": "656D1B89-8E9C-429B-A4FE-D90098FF1C57",
                "type": "TorusKnotBufferGeometry",
                "radius": 1,
                "tube": 0.4,
                "tubularSegments": 64,
                "radialSegments": 8,
                "p": 2,
                "q": 3
            },
            {
                "uuid": "D23C332D-EC45-4D63-990B-7DC2F72A89DD",
                "type": "TorusKnotBufferGeometry",
                "radius": 1,
                "tube": 0.4,
                "tubularSegments": 64,
                "radialSegments": 8,
                "p": 2,
                "q": 3
            },
            {
                "uuid": "E859E2A3-B39F-4522-944A-C98BA901797D",
                "type": "SphereBufferGeometry",
                "radius": 1,
                "widthSegments": 8,
                "heightSegments": 6,
                "phiStart": 0,
                "phiLength": 6.283185,
                "thetaStart": 0,
                "thetaLength": 3.141593
            },
            {
                "uuid": "D0736390-5555-48EE-96AE-DC7527442C88",
                "type": "SphereBufferGeometry",
                "radius": 1,
                "widthSegments": 8,
                "heightSegments": 6,
                "phiStart": 0,
                "phiLength": 6.283185,
                "thetaStart": 0,
                "thetaLength": 3.141593
            },
            {
                "uuid": "FA9DB3C8-10BF-4A90-BB45-87A53C06492B",
                "type": "SphereBufferGeometry",
                "radius": 1,
                "widthSegments": 8,
                "heightSegments": 6,
                "phiStart": 0,
                "phiLength": 6.283185,
                "thetaStart": 0,
                "thetaLength": 3.141593
            },
            {
                "uuid": "2BB76877-7FA1-4C03-9F93-A39B562E57B3",
                "type": "SphereBufferGeometry",
                "radius": 1,
                "widthSegments": 8,
                "heightSegments": 6,
                "phiStart": 0,
                "phiLength": 6.283185,
                "thetaStart": 0,
                "thetaLength": 3.141593
            },
            {
                "uuid": "807FE59F-636E-40E2-8B1C-AA18D068EF92",
                "type": "SphereBufferGeometry",
                "radius": 1,
                "widthSegments": 8,
                "heightSegments": 6,
                "phiStart": 0,
                "phiLength": 6.283185,
                "thetaStart": 0,
                "thetaLength": 3.141593
            },
            {
                "uuid": "3C448CD4-0E20-46F6-9922-DB2E0F416550",
                "type": "SphereBufferGeometry",
                "radius": 1,
                "widthSegments": 8,
                "heightSegments": 6,
                "phiStart": 0,
                "phiLength": 6.283185,
                "thetaStart": 0,
                "thetaLength": 3.141593
            },
            {
                "uuid": "AB391E0F-6800-42BC-8FC9-12895D49129A",
                "type": "SphereBufferGeometry",
                "radius": 1,
                "widthSegments": 8,
                "heightSegments": 6,
                "phiStart": 0,
                "phiLength": 6.283185,
                "thetaStart": 0,
                "thetaLength": 3.141593
            },
            {
                "uuid": "E254049B-04D5-4D90-9939-9E87A38E6B46",
                "type": "SphereBufferGeometry",
                "radius": 1,
                "widthSegments": 8,
                "heightSegments": 6,
                "phiStart": 0,
                "phiLength": 6.283185,
                "thetaStart": 0,
                "thetaLength": 3.141593
            },
            {
                "uuid": "FEDC849C-84CA-410B-A677-954434B6C355",
                "type": "SphereBufferGeometry",
                "radius": 1,
                "widthSegments": 8,
                "heightSegments": 6,
                "phiStart": 0,
                "phiLength": 6.283185,
                "thetaStart": 0,
                "thetaLength": 3.141593
            }],
        "materials": [
            {
                "uuid": "8A09F43A-A3CD-42FE-93B1-2E2DC30DCE32",
                "type": "MeshStandardMaterial",
                "color": 16777215,
                "roughness": 0.5,
                "metalness": 0.5,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "5571D3FC-BE5B-47DD-B14B-1B6BC12CC0D6",
                "type": "MeshStandardMaterial",
                "color": 16777215,
                "roughness": 0.5,
                "metalness": 0.5,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "D52181F4-5FA5-4686-943E-32187E17AE21",
                "type": "MeshStandardMaterial",
                "color": 16777215,
                "roughness": 0.5,
                "metalness": 0.5,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "2B2299E0-5E48-4CB2-B96A-BF0E3260A9A5",
                "type": "MeshStandardMaterial",
                "color": 16777215,
                "roughness": 0.5,
                "metalness": 0.5,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "D6A3FE16-081E-499A-942D-1A26A20B366D",
                "type": "MeshStandardMaterial",
                "color": 16777215,
                "roughness": 0.5,
                "metalness": 0.5,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "B3A3CA54-5298-4756-888B-12C6E4438D62",
                "type": "MeshStandardMaterial",
                "color": 16777215,
                "roughness": 0.5,
                "metalness": 0.5,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "93940F61-A2F0-4C83-9CD7-946CF677B814",
                "type": "MeshStandardMaterial",
                "color": 16777215,
                "roughness": 0.5,
                "metalness": 0.5,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "C38FA36B-5B58-4DD7-A722-F5E84EA78198",
                "type": "MeshStandardMaterial",
                "color": 16777215,
                "roughness": 0.5,
                "metalness": 0.5,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "E91C2C0A-12AB-48D3-9252-28D05D99B5AC",
                "type": "MeshStandardMaterial",
                "color": 16777215,
                "roughness": 0.5,
                "metalness": 0.5,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "7286632A-63B5-4D01-BF86-1F14FABD3FE8",
                "type": "MeshStandardMaterial",
                "color": 16777215,
                "roughness": 0.5,
                "metalness": 0.5,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "E6E688B2-2BD0-48E2-930B-09BA51646870",
                "type": "MeshStandardMaterial",
                "color": 16777215,
                "roughness": 0.5,
                "metalness": 0.5,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "1CF2261F-ADFF-4F9D-8D6C-98C5B4403102",
                "type": "MeshStandardMaterial",
                "color": 16777215,
                "roughness": 0.5,
                "metalness": 0.5,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            }],
        "object": {
            "uuid": "E0BDFE98-C175-4CF5-A037-FFBDB42BE692",
            "type": "Scene",
            "name": "Scene",
            "layers": 1,
            "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
            "children": [
                {
                    "uuid": "E2C6766E-5C49-43F2-A4C7-CF4E2939D228",
                    "type": "Mesh",
                    "name": "TorusKnot",
                    "layers": 1,
                    "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-0.697257,1.199777,-0.677128,1],
                    "geometry": "69D096FA-2934-4764-AEF4-53E937B58416",
                    "material": "8A09F43A-A3CD-42FE-93B1-2E2DC30DCE32"
                },
                {
                    "uuid": "7207B4DF-21BB-403B-B663-A13C079DA283",
                    "type": "Mesh",
                    "name": "TorusKnot",
                    "layers": 1,
                    "matrix": [-0.181636,-0.511941,0.839598,0,0.603462,0.6161,0.506215,0,-0.776429,0.598612,0.197031,0,0.056048,1.689778,-0.176615,1],
                    "geometry": "69D096FA-2934-4764-AEF4-53E937B58416",
                    "material": "8A09F43A-A3CD-42FE-93B1-2E2DC30DCE32"
                },
                {
                    "uuid": "36177DC5-4DC1-40E7-9016-156A83C72A4C",
                    "type": "Mesh",
                    "name": "TorusKnot",
                    "layers": 1,
                    "matrix": [1,0,0,0,0,-0.90463,-0.426198,0,0,0.426198,-0.90463,0,0.229237,1.311831,0.104512,1],
                    "geometry": "69D096FA-2934-4764-AEF4-53E937B58416",
                    "material": "8A09F43A-A3CD-42FE-93B1-2E2DC30DCE32"
                },
                {
                    "uuid": "5C9A6A08-039D-42C6-A516-DFDC3A66FE07",
                    "type": "Mesh",
                    "name": "TorusKnot",
                    "layers": 1,
                    "matrix": [0.393107,0,0,0,0,-0.724062,-0.341127,0,0,0.302085,-0.641194,0,1.72348,0.901111,0.498964,1],
                    "geometry": "69D096FA-2934-4764-AEF4-53E937B58416",
                    "material": "8A09F43A-A3CD-42FE-93B1-2E2DC30DCE32"
                },
                {
                    "uuid": "E4A4B3A9-964C-49E5-861C-0A6FBFB13E55",
                    "type": "Mesh",
                    "name": "TorusKnot",
                    "layers": 1,
                    "matrix": [-0.130367,0,-0.370861,0,-0.321822,-0.724062,0.113129,0,-0.604908,0.302085,0.212641,0,-0.201822,0.901111,-1.137991,1],
                    "geometry": "69D096FA-2934-4764-AEF4-53E937B58416",
                    "material": "8A09F43A-A3CD-42FE-93B1-2E2DC30DCE32"
                },
                {
                    "uuid": "52818F14-CF0F-4D25-ABCB-FBC4D63AD08A",
                    "type": "Mesh",
                    "name": "TorusKnot",
                    "layers": 1,
                    "matrix": [0.201056,0,0.97958,0,0,0.637497,0,0,-0.543225,0,0.111495,0,-1.161525,0.680106,-0.258784,1],
                    "geometry": "656D1B89-8E9C-429B-A4FE-D90098FF1C57",
                    "material": "5571D3FC-BE5B-47DD-B14B-1B6BC12CC0D6"
                },
                {
                    "uuid": "5EECBD16-B6EC-446C-AB92-7C0F764A2058",
                    "type": "Mesh",
                    "name": "TorusKnot",
                    "layers": 1,
                    "matrix": [0.843859,0,0,0,0,0.376881,0,0,0,0,1,0,-0.478342,1.056136,0.336394,1],
                    "geometry": "D23C332D-EC45-4D63-990B-7DC2F72A89DD",
                    "material": "D52181F4-5FA5-4686-943E-32187E17AE21"
                },
                {
                    "uuid": "038C29A9-61C3-4EBD-8B23-97F2FF685CCF",
                    "type": "Mesh",
                    "name": "Sphere",
                    "layers": 1,
                    "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,1.685533,0.985387,0.726898,1],
                    "geometry": "E859E2A3-B39F-4522-944A-C98BA901797D",
                    "material": "2B2299E0-5E48-4CB2-B96A-BF0E3260A9A5"
                },
                {
                    "uuid": "56977196-7FB4-4F66-BC93-F12E0F2A3140",
                    "type": "Mesh",
                    "name": "Sphere",
                    "layers": 1,
                    "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0.330481,1.498967,0.726898,1],
                    "geometry": "E859E2A3-B39F-4522-944A-C98BA901797D",
                    "material": "2B2299E0-5E48-4CB2-B96A-BF0E3260A9A5"
                },
                {
                    "uuid": "B8FD5CB2-7F47-424D-839B-C31DCC95FEB6",
                    "type": "Mesh",
                    "name": "Sphere",
                    "layers": 1,
                    "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0.330481,1.498967,-0.986596,1],
                    "geometry": "E859E2A3-B39F-4522-944A-C98BA901797D",
                    "material": "2B2299E0-5E48-4CB2-B96A-BF0E3260A9A5"
                },
                {
                    "uuid": "3818F6B7-DB3B-4DEF-AE73-14CF8A6999E5",
                    "type": "Mesh",
                    "name": "Sphere",
                    "layers": 1,
                    "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-0.653416,2.334695,-0.986596,1],
                    "geometry": "E859E2A3-B39F-4522-944A-C98BA901797D",
                    "material": "2B2299E0-5E48-4CB2-B96A-BF0E3260A9A5"
                },
                {
                    "uuid": "ED99AADD-EF0A-4140-B77E-B4E10490CFA3",
                    "type": "Mesh",
                    "name": "Sphere",
                    "layers": 1,
                    "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0.736229,0.424475,-0.986596,1],
                    "geometry": "E859E2A3-B39F-4522-944A-C98BA901797D",
                    "material": "2B2299E0-5E48-4CB2-B96A-BF0E3260A9A5"
                },
                {
                    "uuid": "5290E96B-866A-4E8B-ADF9-7E36FB4638C3",
                    "type": "Mesh",
                    "name": "Sphere",
                    "layers": 1,
                    "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-0.681991,0.391957,0.884036,1],
                    "geometry": "E859E2A3-B39F-4522-944A-C98BA901797D",
                    "material": "2B2299E0-5E48-4CB2-B96A-BF0E3260A9A5"
                },
                {
                    "uuid": "D545BD1F-EE95-40C4-8496-7EAC787B87D4",
                    "type": "Mesh",
                    "name": "Sphere",
                    "layers": 1,
                    "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-0.626225,1.1127,-0.388062,1],
                    "geometry": "E859E2A3-B39F-4522-944A-C98BA901797D",
                    "material": "2B2299E0-5E48-4CB2-B96A-BF0E3260A9A5"
                },
                {
                    "uuid": "916CE103-FFA2-4A11-AECD-6CE547F616D0",
                    "type": "Mesh",
                    "name": "Sphere",
                    "layers": 1,
                    "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-1.034616,0.335281,-0.753997,1],
                    "geometry": "D0736390-5555-48EE-96AE-DC7527442C88",
                    "material": "D6A3FE16-081E-499A-942D-1A26A20B366D"
                },
                {
                    "uuid": "A5958977-D40E-4B7F-853A-E42A3CE7A1CB",
                    "type": "Mesh",
                    "name": "Sphere",
                    "layers": 1,
                    "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-0.888586,2.407835,0.064092,1],
                    "geometry": "FA9DB3C8-10BF-4A90-BB45-87A53C06492B",
                    "material": "B3A3CA54-5298-4756-888B-12C6E4438D62"
                },
                {
                    "uuid": "964973B3-0D5C-4BA0-864C-FF10FE41484F",
                    "type": "Mesh",
                    "name": "Sphere",
                    "layers": 1,
                    "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0.527086,0.398149,0.936181,1],
                    "geometry": "2BB76877-7FA1-4C03-9F93-A39B562E57B3",
                    "material": "93940F61-A2F0-4C83-9CD7-946CF677B814"
                },
                {
                    "uuid": "B41E052A-ED4E-49C5-BF67-9BEF1E889525",
                    "type": "Mesh",
                    "name": "Sphere",
                    "layers": 1,
                    "matrix": [2.797037,0,0,0,0,1,0,0,0,0,1,0,-0.581434,0.019139,-0.429565,1],
                    "geometry": "807FE59F-636E-40E2-8B1C-AA18D068EF92",
                    "material": "C38FA36B-5B58-4DD7-A722-F5E84EA78198"
                },
                {
                    "uuid": "8FE4723B-9C95-4559-AA51-40D7069DB80D",
                    "type": "Mesh",
                    "name": "Sphere",
                    "layers": 1,
                    "matrix": [1,0,0,0,0,0.351016,0,0,0,0,1,0,-1.5281,0.509191,0.671174,1],
                    "geometry": "3C448CD4-0E20-46F6-9922-DB2E0F416550",
                    "material": "E91C2C0A-12AB-48D3-9252-28D05D99B5AC"
                },
                {
                    "uuid": "057D1A7F-5724-42BB-8EF7-7D63A22EE289",
                    "type": "Mesh",
                    "name": "Sphere",
                    "layers": 1,
                    "matrix": [0.749099,0,0,0,0,1,0,0,0,0,1,0,-2.027207,0.915263,-0.271615,1],
                    "geometry": "AB391E0F-6800-42BC-8FC9-12895D49129A",
                    "material": "7286632A-63B5-4D01-BF86-1F14FABD3FE8"
                },
                {
                    "uuid": "94EAE580-8CD0-44B6-8066-8A36A9A0C3D5",
                    "type": "Mesh",
                    "name": "Sphere",
                    "layers": 1,
                    "matrix": [3.096015,0,0,0,0,0.770187,0,0,0,0,0.993763,0,0.157541,1.140899,0.334494,1],
                    "geometry": "E254049B-04D5-4D90-9939-9E87A38E6B46",
                    "material": "E6E688B2-2BD0-48E2-930B-09BA51646870"
                },
                {
                    "uuid": "9843D40B-468B-47AA-81A0-95E0BAED4A97",
                    "type": "Mesh",
                    "name": "Sphere",
                    "layers": 1,
                    "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,1.570133,1.256742,-0.554746,1],
                    "geometry": "FEDC849C-84CA-410B-A677-954434B6C355",
                    "material": "1CF2261F-ADFF-4F9D-8D6C-98C5B4403102"
                }],
            "background": 11184810
        }
    };

    public static biplane: any = {
        "metadata": {
            "version": 4.5,
            "type": "Object",
            "generator": "Object3D.toJSON"
        },
        "geometries": [
            {
                "uuid": "A45EFD48-8886-4469-928E-EF68591383AC",
                "type": "CylinderBufferGeometry",
                "radiusTop": 1,
                "radiusBottom": 1,
                "height": 1,
                "radialSegments": 8,
                "heightSegments": 1,
                "openEnded": false,
                "thetaStart": 0,
                "thetaLength": 6.283185
            },
            {
                "uuid": "BBA2EDB2-61CD-4C15-B8C9-D71B6B4B2DBB",
                "type": "SphereBufferGeometry",
                "radius": 1,
                "widthSegments": 8,
                "heightSegments": 6,
                "phiStart": 0,
                "phiLength": 6.283185,
                "thetaStart": 0,
                "thetaLength": 3.141593
            },
            {
                "uuid": "70209E5A-EFC8-4D2B-A5E1-2F8301BFD928",
                "type": "CylinderBufferGeometry",
                "radiusTop": 1,
                "radiusBottom": 1,
                "height": 1,
                "radialSegments": 8,
                "heightSegments": 1,
                "openEnded": false,
                "thetaStart": 0,
                "thetaLength": 6.283185
            },
            {
                "uuid": "12C7262E-C9C1-4ACB-A3D5-1C3476B05DC4",
                "type": "CylinderBufferGeometry",
                "radiusTop": 1,
                "radiusBottom": 1,
                "height": 1,
                "radialSegments": 8,
                "heightSegments": 1,
                "openEnded": false,
                "thetaStart": 0,
                "thetaLength": 6.283185
            },
            {
                "uuid": "80A12EF4-3456-4193-904A-510F37B20B80",
                "type": "CylinderBufferGeometry",
                "radiusTop": 1,
                "radiusBottom": 1,
                "height": 1,
                "radialSegments": 8,
                "heightSegments": 1,
                "openEnded": false,
                "thetaStart": 0,
                "thetaLength": 6.283185
            },
            {
                "uuid": "CDCBB7BF-63CE-4E87-9C5D-F1D6DDF68F3F",
                "type": "CylinderBufferGeometry",
                "radiusTop": 1,
                "radiusBottom": 1,
                "height": 1,
                "radialSegments": 8,
                "heightSegments": 1,
                "openEnded": false,
                "thetaStart": 0,
                "thetaLength": 6.283185
            },
            {
                "uuid": "37DB0466-CA07-467F-8808-2D3D646A1270",
                "type": "BoxBufferGeometry",
                "width": 1,
                "height": 1,
                "depth": 1,
                "widthSegments": 1,
                "heightSegments": 1,
                "depthSegments": 1
            },
            {
                "uuid": "07BF4C73-219E-44EC-888A-CEDB8E5944F0",
                "type": "BoxBufferGeometry",
                "width": 1,
                "height": 1,
                "depth": 1,
                "widthSegments": 1,
                "heightSegments": 1,
                "depthSegments": 1
            },
            {
                "uuid": "24F68FE5-0F88-4A41-91AD-8B0C99996580",
                "type": "CylinderBufferGeometry",
                "radiusTop": 1,
                "radiusBottom": 1,
                "height": 1,
                "radialSegments": 8,
                "heightSegments": 1,
                "openEnded": false,
                "thetaStart": 0,
                "thetaLength": 6.283185
            },
            {
                "uuid": "85E976BB-40D6-4481-862A-961906F7541B",
                "type": "CylinderBufferGeometry",
                "radiusTop": 1,
                "radiusBottom": 1,
                "height": 1,
                "radialSegments": 8,
                "heightSegments": 1,
                "openEnded": false,
                "thetaStart": 0,
                "thetaLength": 6.283185
            },
            {
                "uuid": "A5C87A14-92CD-4F94-B937-3D7D538BFB40",
                "type": "CylinderBufferGeometry",
                "radiusTop": 1,
                "radiusBottom": 1,
                "height": 1,
                "radialSegments": 8,
                "heightSegments": 1,
                "openEnded": false,
                "thetaStart": 0,
                "thetaLength": 6.283185
            },
            {
                "uuid": "A26BB381-3381-4486-9FDD-FFF7330BCBEB",
                "type": "CylinderBufferGeometry",
                "radiusTop": 1,
                "radiusBottom": 1,
                "height": 1,
                "radialSegments": 8,
                "heightSegments": 1,
                "openEnded": false,
                "thetaStart": 0,
                "thetaLength": 6.283185
            }],
        "materials": [
            {
                "uuid": "34CC4A14-C04F-41B4-8450-FAE23559F3CD",
                "type": "MeshLambertMaterial",
                "color": 16777215,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "5F493B54-7ADF-441C-881B-D6CCF8A281AC",
                "type": "MeshLambertMaterial",
                "color": 16777215,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "FAF659ED-75B7-4788-B2BB-079C2F045B03",
                "type": "MeshLambertMaterial",
                "color": 16777215,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "1F1F881C-20FD-437E-B653-1BB99F700397",
                "type": "MeshLambertMaterial",
                "color": 16777215,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "C311BC8B-E0AF-499A-B48F-C0AB10DA6A39",
                "type": "MeshLambertMaterial",
                "color": 16777215,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "34D9DBB0-CDB5-434C-ACEC-A78AF80FE13A",
                "type": "MeshLambertMaterial",
                "color": 16777215,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "2CC3CD42-AA9E-4E81-86A2-BDA00A707124",
                "type": "MeshLambertMaterial",
                "color": 16777215,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "148341B0-B5FC-4ECD-936C-9D54A565B84A",
                "type": "MeshLambertMaterial",
                "color": 16777215,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "6EBA0917-C565-407F-9662-DA635514B336",
                "type": "MeshLambertMaterial",
                "color": 16777215,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "F3C4EFB9-0E4C-4A9D-B8B0-6F1842DF9424",
                "type": "MeshLambertMaterial",
                "color": 16777215,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "12490448-6DC4-4A8C-97C0-77CFE6DEC430",
                "type": "MeshLambertMaterial",
                "color": 16777215,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "F72BECAB-73C7-457A-82D5-0970CC89DEEC",
                "type": "MeshLambertMaterial",
                "color": 16777215,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            }],
        "object": {
            "uuid": "31517222-A9A7-4EAF-B5F6-60751C0BABA3",
            "type": "Scene",
            "name": "Scene",
            "layers": 1,
            "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
            "children": [
                {
                    "uuid": "694AEDD8-01CE-4C50-B307-065112F21908",
                    "type": "Mesh",
                    "name": "Cylinder",
                    "layers": 1,
                    "matrix": [1,0,0,0,0,0,6,0,0,-1,0,0,0,4.181591,0,1],
                    "geometry": "A45EFD48-8886-4469-928E-EF68591383AC",
                    "material": "34CC4A14-C04F-41B4-8450-FAE23559F3CD"
                },
                {
                    "uuid": "DDCF971D-B94B-44ED-9788-FADCAF4DE3E9",
                    "type": "Mesh",
                    "name": "Sphere",
                    "layers": 1,
                    "matrix": [0.357729,0,0,0,0,0.424512,0,0,0,0,0.68454,0,0,4.167605,3.110632,1],
                    "geometry": "BBA2EDB2-61CD-4C15-B8C9-D71B6B4B2DBB",
                    "material": "5F493B54-7ADF-441C-881B-D6CCF8A281AC"
                },
                {
                    "uuid": "7551DF4C-044C-457B-9A1F-99FA5CBB5A2F",
                    "type": "Mesh",
                    "name": "Cylinder",
                    "layers": 1,
                    "matrix": [3,0,0,0,0,0,0.15,0,0,-0.2,0,0,0,4.131433,3.541472,1],
                    "geometry": "70209E5A-EFC8-4D2B-A5E1-2F8301BFD928",
                    "material": "FAF659ED-75B7-4788-B2BB-079C2F045B03"
                },
                {
                    "uuid": "630C95D1-DCDF-4B94-AC1C-D353389C5EDB",
                    "type": "Mesh",
                    "name": "Cylinder",
                    "layers": 1,
                    "matrix": [0,0.5,0,0,-0.3,0,0,0,0,0,0.5,0,-0.385133,3.173011,1.987327,1],
                    "geometry": "12C7262E-C9C1-4ACB-A3D5-1C3476B05DC4",
                    "material": "1F1F881C-20FD-437E-B653-1BB99F700397"
                },
                {
                    "uuid": "2DFABE79-2A1D-4490-AD31-431F8649934C",
                    "type": "Mesh",
                    "name": "Cylinder",
                    "layers": 1,
                    "matrix": [0,0.5,0,0,-0.3,0,0,0,0,0,0.5,0,0.543351,3.128059,1.910481,1],
                    "geometry": "80A12EF4-3456-4193-904A-510F37B20B80",
                    "material": "C311BC8B-E0AF-499A-B48F-C0AB10DA6A39"
                },
                {
                    "uuid": "5EAAF228-EE69-4D6A-84BE-B640109D5EA2",
                    "type": "Mesh",
                    "name": "Cylinder",
                    "layers": 1,
                    "matrix": [0,0.5,0,0,-0.3,0,0,0,0,0,0.5,0,0,3.244586,-2.517566,1],
                    "geometry": "CDCBB7BF-63CE-4E87-9C5D-F1D6DDF68F3F",
                    "material": "34D9DBB0-CDB5-434C-ACEC-A78AF80FE13A"
                },
                {
                    "uuid": "C0A74B9F-FDC6-4E11-9E70-9581948210DA",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [10,0,0,0,0,0.15,0,0,0,0,5,0,0,5,0,1],
                    "geometry": "37DB0466-CA07-467F-8808-2D3D646A1270",
                    "material": "2CC3CD42-AA9E-4E81-86A2-BDA00A707124"
                },
                {
                    "uuid": "FCD4D03F-1C7A-4054-9944-7566E2F08E43",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [10,0,0,0,0,0.15,0,0,0,0,5,0,0,6,0,1],
                    "geometry": "07BF4C73-219E-44EC-888A-CEDB8E5944F0",
                    "material": "148341B0-B5FC-4ECD-936C-9D54A565B84A"
                },
                {
                    "uuid": "41E3FB58-8846-4040-B985-9CE5D4D07DCF",
                    "type": "Mesh",
                    "name": "Cylinder",
                    "layers": 1,
                    "matrix": [0.15,0,0,0,0,1.1,0,0,0,0,0.15,0,-3,5.5,2,1],
                    "geometry": "24F68FE5-0F88-4A41-91AD-8B0C99996580",
                    "material": "6EBA0917-C565-407F-9662-DA635514B336"
                },
                {
                    "uuid": "39F88B89-261A-4F02-AD23-A43DADD342E8",
                    "type": "Mesh",
                    "name": "Cylinder",
                    "layers": 1,
                    "matrix": [0.15,0,0,0,0,1.1,0,0,0,0,0.15,0,3,5.5,2,1],
                    "geometry": "85E976BB-40D6-4481-862A-961906F7541B",
                    "material": "F3C4EFB9-0E4C-4A9D-B8B0-6F1842DF9424"
                },
                {
                    "uuid": "53D82935-BF9A-41D7-9170-87CA3EA8FF02",
                    "type": "Mesh",
                    "name": "Cylinder",
                    "layers": 1,
                    "matrix": [0.15,0,0,0,0,1.1,0,0,0,0,0.15,0,-3,5.5,-2,1],
                    "geometry": "A5C87A14-92CD-4F94-B937-3D7D538BFB40",
                    "material": "12490448-6DC4-4A8C-97C0-77CFE6DEC430"
                },
                {
                    "uuid": "F5EDAA99-2A36-4280-8ECE-577E538F1457",
                    "type": "Mesh",
                    "name": "Cylinder",
                    "layers": 1,
                    "matrix": [0.15,0,0,0,0,1.1,0,0,0,0,0.15,0,3,5.5,-2,1],
                    "geometry": "A26BB381-3381-4486-9FDD-FFF7330BCBEB",
                    "material": "F72BECAB-73C7-457A-82D5-0970CC89DEEC"
                }],
            "background": 11184810
        }
    };

    public static satellite: any = {
        "metadata": {
            "version": 4.5,
            "type": "Object",
            "generator": "Object3D.toJSON"
        },
        "geometries": [
            {
                "uuid": "C0D7F1A3-74FA-472D-BF3D-738E31E3773B",
                "type": "BoxBufferGeometry",
                "width": 1,
                "height": 1,
                "depth": 1,
                "widthSegments": 1,
                "heightSegments": 1,
                "depthSegments": 1
            },
            {
                "uuid": "CD915194-8C88-4C22-9CA3-D4184611A699",
                "type": "CylinderBufferGeometry",
                "radiusTop": 1,
                "radiusBottom": 1,
                "height": 1,
                "radialSegments": 8,
                "heightSegments": 1,
                "openEnded": false,
                "thetaStart": 0,
                "thetaLength": 6.283185
            },
            {
                "uuid": "96A957FD-221D-4EE6-9377-B4F12B46E802",
                "type": "BoxBufferGeometry",
                "width": 1,
                "height": 1,
                "depth": 1,
                "widthSegments": 1,
                "heightSegments": 1,
                "depthSegments": 1
            },
            {
                "uuid": "8F5F5CC7-C907-40D1-AF13-3E8E0E2BBDD8",
                "type": "SphereBufferGeometry",
                "radius": 1,
                "widthSegments": 8,
                "heightSegments": 6,
                "phiStart": 0,
                "phiLength": 6.283185,
                "thetaStart": 0,
                "thetaLength": 3.141593
            }],
        "materials": [
            {
                "uuid": "4DFD51AE-7A1C-4909-A363-7B35E63F38CF",
                "type": "MeshLambertMaterial",
                "color": 16777215,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "3D5DA464-D09D-4543-9D27-19E8E971DA5E",
                "type": "MeshLambertMaterial",
                "color": 16777215,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "EC5FF078-91F5-4011-9F6E-77663010446F",
                "type": "MeshLambertMaterial",
                "color": 16777215,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "B7BD2D5C-9682-41DF-BE40-73FCA00B16F3",
                "type": "MeshLambertMaterial",
                "color": 16777215,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "09745F52-229B-471B-9632-5822BE93F9E6",
                "type": "MeshStandardMaterial",
                "color": 16777215,
                "roughness": 0.5,
                "metalness": 0.5,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            }],
        "object": {
            "uuid": "A42381F5-BE61-4BD8-B160-16745E49FD03",
            "type": "Scene",
            "name": "Scene",
            "layers": 1,
            "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
            "children": [
                {
                    "uuid": "D4FC4FCF-9144-48EF-B7F7-DEFCB4E3F4C9",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [0.080309,0,0,0,0,6.98875,0,0,0,0,4.752093,0,0,0,-0.016737,1],
                    "geometry": "C0D7F1A3-74FA-472D-BF3D-738E31E3773B",
                    "material": "4DFD51AE-7A1C-4909-A363-7B35E63F38CF"
                },
                {
                    "uuid": "EDF84F7A-436B-49F3-9434-8483FFC8DDF0",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [0.071657,0,0,0,0,7.301622,0,0,0,0,4.950543,0,4.182814,0,-0.016737,1],
                    "geometry": "C0D7F1A3-74FA-472D-BF3D-738E31E3773B",
                    "material": "3D5DA464-D09D-4543-9D27-19E8E971DA5E"
                },
                {
                    "uuid": "487B0D0A-7324-44F9-9E2E-4ABC9D7B978A",
                    "type": "Mesh",
                    "name": "Cylinder",
                    "layers": 1,
                    "matrix": [0.378722,0,0,0,0,2.365106,0,0,0,0,0.495493,0,2.014959,0,0,1],
                    "geometry": "CD915194-8C88-4C22-9CA3-D4184611A699",
                    "material": "EC5FF078-91F5-4011-9F6E-77663010446F"
                },
                {
                    "uuid": "A6E7819D-89D9-4251-85DC-3A8E675231EB",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [4.177062,0,0,0,0,0.203729,0,0,0,0,0.198931,0,2.092634,0,0.03808,1],
                    "geometry": "96A957FD-221D-4EE6-9377-B4F12B46E802",
                    "material": "B7BD2D5C-9682-41DF-BE40-73FCA00B16F3"
                },
                {
                    "uuid": "C86EF9A0-472F-45E2-B364-8A781EEA6995",
                    "type": "Mesh",
                    "name": "Sphere",
                    "layers": 1,
                    "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,2.038646,0,0,1],
                    "geometry": "8F5F5CC7-C907-40D1-AF13-3E8E0E2BBDD8",
                    "material": "09745F52-229B-471B-9632-5822BE93F9E6"
                }],
            "background": 11184810
        }
    };

    public static robot: any = {
        "metadata": {
            "version": 4.5,
            "type": "Object",
            "generator": "Object3D.toJSON"
        },
        "geometries": [
            {
                "uuid": "C03F0BB0-3BF3-4C08-9F3F-2417B8387343",
                "type": "BoxBufferGeometry",
                "width": 1,
                "height": 1,
                "depth": 1,
                "widthSegments": 1,
                "heightSegments": 1,
                "depthSegments": 1
            },
            {
                "uuid": "122AC26E-DEDA-47E8-871C-9FA59E144102",
                "type": "BoxBufferGeometry",
                "width": 1,
                "height": 1,
                "depth": 1,
                "widthSegments": 1,
                "heightSegments": 1,
                "depthSegments": 1
            },
            {
                "uuid": "A6407E1E-E752-4DA0-93C9-B137C8B19A73",
                "type": "BoxBufferGeometry",
                "width": 1,
                "height": 1,
                "depth": 1,
                "widthSegments": 1,
                "heightSegments": 1,
                "depthSegments": 1
            },
            {
                "uuid": "BBE9FA08-117F-4DDC-A4A3-72464DEE80BC",
                "type": "BoxBufferGeometry",
                "width": 1,
                "height": 1,
                "depth": 1,
                "widthSegments": 1,
                "heightSegments": 1,
                "depthSegments": 1
            },
            {
                "uuid": "7328C054-3E62-4D59-8CDF-C1CB658019A1",
                "type": "BoxBufferGeometry",
                "width": 1,
                "height": 1,
                "depth": 1,
                "widthSegments": 1,
                "heightSegments": 1,
                "depthSegments": 1
            },
            {
                "uuid": "57DBE39C-7CD5-4068-BE0B-790B725500DA",
                "type": "IcosahedronBufferGeometry",
                "radius": 1,
                "detail": 0
            }],
        "materials": [
            {
                "uuid": "00667F7A-A167-4B06-BE69-FBC34EBA5CE2",
                "type": "MeshLambertMaterial",
                "color": 16777215,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "2D4CC89C-8B1B-4ABC-A4BD-28F235B3ADD4",
                "type": "MeshLambertMaterial",
                "color": 16777215,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "8C5B916F-63AF-4915-99E9-62D7DEC654AD",
                "type": "MeshLambertMaterial",
                "color": 16777215,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "21DA4836-382C-4DFE-9403-E362AD62F3CB",
                "type": "MeshLambertMaterial",
                "color": 16777215,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "ABED6A8A-1220-4730-897D-7B7FBAD66612",
                "type": "MeshLambertMaterial",
                "color": 16777215,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "E2A29D50-8BF4-4BF4-96BC-ACEF51B7DDB3",
                "type": "MeshLambertMaterial",
                "color": 16777215,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "E2D6B21B-416C-499B-AD26-1C973CFF9192",
                "type": "MeshStandardMaterial",
                "color": 16777215,
                "roughness": 0.5,
                "metalness": 0.5,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "6ECDA94F-8D23-497B-9D03-09BB566A4CEB",
                "type": "MeshLambertMaterial",
                "color": 16777215,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "1E9A0E28-507D-4AE8-9769-190B20B225F3",
                "type": "MeshLambertMaterial",
                "color": 16777215,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            },
            {
                "uuid": "2C8585C6-0E8C-432A-97B3-AD07A53355FE",
                "type": "MeshLambertMaterial",
                "color": 16777215,
                "emissive": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true
            }],
        "object": {
            "uuid": "31517222-A9A7-4EAF-B5F6-60751C0BABA3",
            "type": "Scene",
            "name": "Scene",
            "layers": 1,
            "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
            "children": [
                {
                    "uuid": "6147A73E-BABA-4425-AA0B-BA8E8304F8E9",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [1,0,0,0,0,3.151837,0,0,0,0,1.615502,0,0,0,0,1],
                    "geometry": "C03F0BB0-3BF3-4C08-9F3F-2417B8387343",
                    "material": "00667F7A-A167-4B06-BE69-FBC34EBA5CE2"
                },
                {
                    "uuid": "CF66D767-E775-4F2D-992B-7787C0621FCA",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [1.439842,0,0,0,0,1.024674,0,0,0,0,1.024674,0,0,2.050485,0,1],
                    "geometry": "122AC26E-DEDA-47E8-871C-9FA59E144102",
                    "material": "2D4CC89C-8B1B-4ABC-A4BD-28F235B3ADD4"
                },
                {
                    "uuid": "DDA0E5C6-06C0-4B95-98D9-CC42511B1AA6",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [0.28793,0,0,0,0,0.835107,-0.550088,0,0,0.109522,0.166269,0,0,2.877122,-0.638522,1],
                    "geometry": "A6407E1E-E752-4DA0-93C9-B137C8B19A73",
                    "material": "8C5B916F-63AF-4915-99E9-62D7DEC654AD"
                },
                {
                    "uuid": "98C39F28-3E72-4491-9FF4-4B89888C1B5C",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [0.28793,0,0,0,0,0.826059,0.563583,0,0,-0.112209,0.164468,0,0,2.882442,0.643956,1],
                    "geometry": "A6407E1E-E752-4DA0-93C9-B137C8B19A73",
                    "material": "21DA4836-382C-4DFE-9403-E362AD62F3CB"
                },
                {
                    "uuid": "092B9C21-7EAD-4097-AACE-EDE3DAA25719",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [0.475154,0,0,0,0,2.674336,0,0,0,0,0.441623,0,0,0,0.963937,1],
                    "geometry": "BBE9FA08-117F-4DDC-A4A3-72464DEE80BC",
                    "material": "ABED6A8A-1220-4730-897D-7B7FBAD66612"
                },
                {
                    "uuid": "35C74160-AA53-43AC-866D-716F4B7849E5",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [0.475154,0,0,0,0,2.674336,0,0,0,0,0.441623,0,0,0,-1.072291,1],
                    "geometry": "BBE9FA08-117F-4DDC-A4A3-72464DEE80BC",
                    "material": "E2A29D50-8BF4-4BF4-96BC-ACEF51B7DDB3"
                },
                {
                    "uuid": "9DF790CA-3341-42C1-B87B-09F75BC3399B",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [1,0,0,0,0,2.475675,0,0,0,0,1.309842,0,0.966694,0.257034,0,1],
                    "geometry": "7328C054-3E62-4D59-8CDF-C1CB658019A1",
                    "material": "E2D6B21B-416C-499B-AD26-1C973CFF9192"
                },
                {
                    "uuid": "1F3F08A5-F9AA-43C3-A443-4CF430FB5BAF",
                    "type": "Mesh",
                    "name": "Icosahedron",
                    "layers": 1,
                    "matrix": [0.432796,0,0,0,0,0.942168,0,0,0,0,0.217197,0,1.087035,-1.354096,0,1],
                    "geometry": "57DBE39C-7CD5-4068-BE0B-790B725500DA",
                    "material": "6ECDA94F-8D23-497B-9D03-09BB566A4CEB"
                },
                {
                    "uuid": "416B6CFA-DA75-49B8-858D-21A1675CE42A",
                    "type": "Mesh",
                    "name": "Icosahedron",
                    "layers": 1,
                    "matrix": [0.432796,0,0,0,0,1.586434,0,0,0,0,0.217197,0,0.970491,-1.405229,0.205681,1],
                    "geometry": "57DBE39C-7CD5-4068-BE0B-790B725500DA",
                    "material": "1E9A0E28-507D-4AE8-9769-190B20B225F3"
                },
                {
                    "uuid": "18D7ED07-3072-4F35-9CE3-14FCA7565C9D",
                    "type": "Mesh",
                    "name": "Icosahedron",
                    "layers": 1,
                    "matrix": [0.432796,0,0,0,0,2.047746,0,0,0,0,0.217197,0,1.082455,-1.932723,-0.237123,1],
                    "geometry": "57DBE39C-7CD5-4068-BE0B-790B725500DA",
                    "material": "2C8585C6-0E8C-432A-97B3-AD07A53355FE"
                },
                {
                    "uuid": "805E6321-A38A-40EE-89CC-49AA04647146",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [0.475154,0,0,0,0,2.892872,0,0,0,0,0.441623,0,-0.105153,-2.720976,-0.60194,1],
                    "geometry": "BBE9FA08-117F-4DDC-A4A3-72464DEE80BC",
                    "material": "E2A29D50-8BF4-4BF4-96BC-ACEF51B7DDB3"
                },
                {
                    "uuid": "B6FD5337-0076-4671-93A6-124FAD547F68",
                    "type": "Mesh",
                    "name": "Box",
                    "layers": 1,
                    "matrix": [0.475154,0,0,0,0,2.892872,0,0,0,0,0.441623,0,-0.105153,-2.720976,0.540159,1],
                    "geometry": "BBE9FA08-117F-4DDC-A4A3-72464DEE80BC",
                    "material": "E2A29D50-8BF4-4BF4-96BC-ACEF51B7DDB3"
                }],
            "background": 11184810
        }
    };

        public static models: any[] = [Models.airplane, Models.biplane, Models.hotAirBalloon,
    Models.manWithBalloon, Models.cloud, Models.helicopter, Models.xWing,
    Models.ufo, Models.satellite, Models.robot];
}
