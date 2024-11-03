import FilteredCart from "@/components/FilteredCart"

const supermarkets = [
    {
        "name": "La Sirena",
        "logo": "supermarket_a_logo.png",
        "products": [
            {
                "id": 1,
                "image": "https://i.pinimg.com/736x/92/32/18/9232187cc593f137f8dd2163f9a3348d.jpg",
                "title": "jamón Caserio pechuga de pavo lb. (rebanado)",
                "supermarketLogo": "supermarket_a_logo.png",
                "calories": 52,
                "precio": 1.2,
                "cantidad": 1
            },
            {
                "id": 2,
                "image": "https://th.bing.com/th/id/OIP.GArzyl7MMkCLqjipWQBZWAHaE7?rs=1&pid=ImgDetMain",
                "title": "Banana",
                "supermarketLogo": "supermarket_a_logo.png",
                "calories": 89,
                "precio": 0.5,
                "cantidad": 20
            },
            {
                "id": 3,
                "image": "https://www.norseland.ca/wp-content/uploads/jarlsberg_lite.jpg",
                "title": "Apple",
                "supermarketLogo": "supermarket_a_logo.png",
                "calories": 52,
                "precio": 1.2,
                "cantidad": 10
            },
            {
                "id": 4,
                "image": "https://th.bing.com/th/id/OIP.GArzyl7MMkCLqjipWQBZWAHaE7?rs=1&pid=ImgDetMain",
                "title": "Banana",
                "supermarketLogo": "supermarket_a_logo.png",
                "calories": 89,
                "precio": 0.5,
                "cantidad": 20
            },
            {
                "id": 5,
                "image": "https://mejorconsalud.as.com/wp-content/uploads/2021/01/mantequilla-mani-casera.jpg",
                "title": "Apple",
                "supermarketLogo": "supermarket_a_logo.png",
                "calories": 52,
                "precio": 1.2,
                "cantidad": 10
            },
            {
                "id": 6,
                "image": "https://th.bing.com/th/id/OIP.GArzyl7MMkCLqjipWQBZWAHaE7?rs=1&pid=ImgDetMain",
                "title": "Banana",
                "supermarketLogo": "supermarket_a_logo.png",
                "calories": 89,
                "precio": 0.5,
                "cantidad": 20
            },
            {
                "id": 7,
                "image": "https://i.pinimg.com/736x/92/32/18/9232187cc593f137f8dd2163f9a3348d.jpg",
                "title": "Apple",
                "supermarketLogo": "supermarket_a_logo.png",
                "calories": 52,
                "precio": 1.2,
                "cantidad": 10
            },
            {
                "id": 8,
                "image": "https://th.bing.com/th/id/OIP.GArzyl7MMkCLqjipWQBZWAHaE7?rs=1&pid=ImgDetMain",
                "title": "Banana",
                "supermarketLogo": "supermarket_a_logo.png",
                "calories": 89,
                "precio": 0.5,
                "cantidad": 20
            }
        ]
    },
    {
        "name": "Bravo",
        "logo": "supermarket_b_logo.png",
        "products": [
            {
            "id": 3,
            "image": "https://mejorconsalud.as.com/wp-content/uploads/2021/01/mantequilla-mani-casera.jpg",
            "title": "Milk",
            "supermarketLogo": "supermarket_b_logo.png",
            "calories": 42,
            "precio": 1.0,
            "cantidad": 1
            },
            {
            "id": 4,
            "image": "https://www.norseland.ca/wp-content/uploads/jarlsberg_lite.jpg",
            "title": "Cheese",
            "supermarketLogo": "supermarket_b_logo.png",
            "calories": 402,
            "precio": 3.5,
            "cantidad": 5
            },
            {
                "id": 5,
                "image": "/pruebaRegistro.jpg",
                "title": "Cheese",
                "supermarketLogo": "supermarket_b_logo.png",
                "calories": 402,
                "precio": 3.5,
                "cantidad": 5
            }
        ]
    },
    {
        "name": "Nacional",
        "logo": "supermarket_c_logo.png",
        "products": [
            {
            "id": 5,
            "image": "https://www.norseland.ca/wp-content/uploads/jarlsberg_lite.jpg",
            "title": "Bread",
            "supermarketLogo": "supermarket_c_logo.png",
            "calories": 265,
            "precio": 1.1,
            "cantidad": 2
            },
            {
            "id": 6,
            "image": "https://th.bing.com/th/id/R.d2fdbe76218ebd6b68d40160df78e897?rik=RFeROJfxksp7KA&riu=http%3a%2f%2fwww.vegamomx.com%2fuploads%2f6%2f5%2f0%2f6%2f65061549%2fp1070148_2_orig.jpg&ehk=ITiyvOtHPnQJBwPq%2blomqiNeSeGTo5PTTxR%2bsVLulJU%3d&risl=&pid=ImgRaw&r=0",
            "title": "Eggs",
            "supermarketLogo": "supermarket_c_logo.png",
            "calories": 155,
            "precio": 2.0,
            "cantidad": 0
            }
        ]
    }
]

export default function Cart() {
    return <FilteredCart supermarkets={supermarkets}/>
}