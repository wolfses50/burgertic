    [
        {
            "id": 5,
            "fecha": "2023-10-25T03:00:00.000Z",
            "estado": "pendiente",
            "id_usuario": 1,
            "platos": [
                {
                    "id": 6,
                    "nombre": "Combo Jero",
                    "precio": 3100,
                    "cantidad": 5
                },
                {
                    "id": 3,
                    "nombre": "Combo Aro y Ranzo",
                    "precio": 4500,
                    "cantidad": 4
                }
            ]
        },
        {
            "id": 6,
            "fecha": "2023-10-25T03:00:00.000Z",
            "estado": "pendiente",
            "id_usuario": 1,
            "platos": [
                {
                    "id": 3,
                    "nombre": "Combo Aro y Ranzo",
                    "precio": 4500,
                    "cantidad": 3
                }
            ]
        }
    ]

/*
SELECT pedidos.id //agregar el resto de cosas a pedir
FROM pedidos
JOIN pedidos_platos ON pedidos_platos.id_pedido = pedidos.id
JOIN platos ON pedidos_platos.id_plato = platos.id
WHERE pedidos.id_usuario = 1
*/