import React from 'react'
import NavBar from '../../components/NavBar'
import plate from '../../assets/imgHome.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Card from './components/Card'

const data = [
    {
        plate: 'Spaghetti Carbonara',
        image: '',
        ingredients: [
            { name: 'Spaghetti', amount: 200, measure_portion: 'gr' },
            { name: 'Eggs', amount: 2, measure_portion: 'units' },
            { name: 'Bacon', amount: 100, measure_portion: 'gr' },
            { name: 'Parmesan', amount: 50, measure_portion: 'gr' }
        ],
        values: [
            { idUser: 1, score: 3, comments: ['Delicious and creamy'] },
            { idUser: 2, score: 4, comments: ['Perfect balance of flavors'] },
            { idUser: 3, score: 2, comments: ['Could use more bacon'] }
        ]
    },
    {
        plate: 'Chicken Caesar Salad',
        image: '',
        ingredients: [
            { name: 'Chicken Breast', amount: 150, measure_portion: 'gr' },
            { name: 'Romaine Lettuce', amount: 1, measure_portion: 'head' },
            { name: 'Caesar Dressing', amount: 50, measure_portion: 'ml' },
            { name: 'Croutons', amount: 30, measure_portion: 'gr' }
        ],
        values: [
            { idUser: 4, score: 5, comments: ['Fresh and flavorful!'] },
            { idUser: 5, score: 3, comments: ['Too much dressing for my taste'] },
            { idUser: 6, score: 4, comments: ['Great for a light meal'] }
        ]
    },
    {
        plate: 'Beef Tacos',
        image: '',
        ingredients: [
            { name: 'Ground Beef', amount: 200, measure_portion: 'gr' },
            { name: 'Tortillas', amount: 3, measure_portion: 'units' },
            { name: 'Cheddar Cheese', amount: 50, measure_portion: 'gr' },
            { name: 'Lettuce', amount: 30, measure_portion: 'gr' }
        ],
        values: [
            { idUser: 7, score: 4, comments: ['Loved the flavors!'] },
            { idUser: 8, score: 2, comments: ['Not enough seasoning'] },
            { idUser: 9, score: 5, comments: ['Perfect for taco night'] }
        ]
    },
    {
        plate: 'Margherita Pizza',
        image: '',
        ingredients: [
            { name: 'Pizza Dough', amount: 1, measure_portion: 'unit' },
            { name: 'Tomato Sauce', amount: 100, measure_portion: 'ml' },
            { name: 'Mozzarella', amount: 100, measure_portion: 'gr' },
            { name: 'Basil Leaves', amount: 10, measure_portion: 'gr' }
        ],
        values: [
            { idUser: 10, score: 4, comments: ['Classic and delicious'] },
            { idUser: 11, score: 5, comments: ['Loved the fresh basil'] },
            { idUser: 12, score: 3, comments: ['Could use more cheese'] }
        ]
    },
    {
        plate: 'Salmon Teriyaki',
        image: '',
        ingredients: [
            { name: 'Salmon Fillet', amount: 200, measure_portion: 'gr' },
            { name: 'Teriyaki Sauce', amount: 50, measure_portion: 'ml' },
            { name: 'Sesame Seeds', amount: 10, measure_portion: 'gr' },
            { name: 'Green Onions', amount: 20, measure_portion: 'gr' }
        ],
        values: [
            { idUser: 13, score: 5, comments: ['Perfectly cooked!'] },
            { idUser: 14, score: 4, comments: ['Could use more sauce'] },
            { idUser: 15, score: 5, comments: ['Excellent flavors'] }
        ]
    },
    {
        plate: 'Vegetable Stir Fry',
        image: '',
        ingredients: [
            { name: 'Bell Peppers', amount: 100, measure_portion: 'gr' },
            { name: 'Carrot', amount: 1, measure_portion: 'unit' },
            { name: 'Broccoli', amount: 100, measure_portion: 'gr' },
            { name: 'Soy Sauce', amount: 30, measure_portion: 'ml' }
        ],
        values: [
            { idUser: 16, score: 4, comments: ['Very healthy and tasty'] },
            { idUser: 17, score: 3, comments: ['Needed more sauce'] },
            { idUser: 18, score: 5, comments: ['Fresh and vibrant'] }
        ]
    },
    {
        plate: 'Shrimp Paella',
        image: '',
        ingredients: [
            { name: 'Shrimp', amount: 200, measure_portion: 'gr' },
            { name: 'Rice', amount: 1, measure_portion: 'cup' },
            { name: 'Peas', amount: 50, measure_portion: 'gr' },
            { name: 'Bell Pepper', amount: 1, measure_portion: 'unit' }
        ],
        values: [
            { idUser: 19, score: 5, comments: ['Authentic and flavorful'] },
            { idUser: 20, score: 4, comments: ['Loved the seafood taste'] },
            { idUser: 21, score: 3, comments: ['Rice was a bit dry'] }
        ]
    },
    {
        plate: 'French Toast',
        image: '',
        ingredients: [
            { name: 'Bread', amount: 2, measure_portion: 'slices' },
            { name: 'Egg', amount: 1, measure_portion: 'unit' },
            { name: 'Milk', amount: 50, measure_portion: 'ml' },
            { name: 'Cinnamon', amount: 5, measure_portion: 'gr' }
        ],
        values: [
            { idUser: 22, score: 4, comments: ['Perfectly sweet'] },
            { idUser: 23, score: 5, comments: ['Great for breakfast'] },
            { idUser: 24, score: 3, comments: ['Could be a bit fluffier'] }
        ]
    },
    {
        plate: 'Grilled Cheese Sandwich',
        image: '',
        ingredients: [
            { name: 'Bread', amount: 2, measure_portion: 'slices' },
            { name: 'Cheddar Cheese', amount: 50, measure_portion: 'gr' },
            { name: 'Butter', amount: 10, measure_portion: 'gr' }
        ],
        values: [
            { idUser: 25, score: 4, comments: ['Cheesy and crispy'] },
            { idUser: 26, score: 3, comments: ['Good but a bit greasy'] },
            { idUser: 27, score: 5, comments: ['Classic comfort food'] }
        ]
    },
    {
        plate: 'Beef Stroganoff',
        image: '',
        ingredients: [
            { name: 'Beef', amount: 200, measure_portion: 'gr' },
            { name: 'Mushrooms', amount: 50, measure_portion: 'gr' },
            { name: 'Onion', amount: 1, measure_portion: 'unit' },
            { name: 'Sour Cream', amount: 50, measure_portion: 'ml' }
        ],
        values: [
            { idUser: 28, score: 4, comments: ['Rich and creamy'] },
            { idUser: 29, score: 5, comments: ['Perfectly balanced flavors'] },
            { idUser: 30, score: 3, comments: ['Too heavy for my taste'] }
        ]
    },
    {
        plate: 'Pancakes',
        image: '',
        ingredients: [
            { name: 'Flour', amount: 100, measure_portion: 'gr' },
            { name: 'Egg', amount: 1, measure_portion: 'unit' },
            { name: 'Milk', amount: 100, measure_portion: 'ml' },
            { name: 'Sugar', amount: 20, measure_portion: 'gr' }
        ],
        values: [
            { idUser: 31, score: 5, comments: ['Soft and fluffy'] },
            { idUser: 32, score: 4, comments: ['Perfect with syrup'] },
            { idUser: 33, score: 3, comments: ['A bit too sweet'] }
        ]
    },
    {
        plate: 'Vegetable Soup',
        image: '',
        ingredients: [
            { name: 'Carrot', amount: 1, measure_portion: 'unit' },
            { name: 'Celery', amount: 1, measure_portion: 'stalk' },
            { name: 'Potato', amount: 1, measure_portion: 'unit' },
            { name: 'Vegetable Broth', amount: 500, measure_portion: 'ml' }
        ],
        values: [
            { idUser: 34, score: 4, comments: ['Very comforting'] },
            { idUser: 35, score: 5, comments: ['Loved the freshness'] },
            { idUser: 36, score: 3, comments: ['Could use more seasoning'] }
        ]
    }
];



export const Community = () => {
  return (
    <div className="h-screen w-full overflow-y-hidden">
        <NavBar />
        <div className='w-full h-full flex justify-center items-start overflow-y-scroll font-quicksand mt-4 sm:mt-16 md:mt-16 lg:mt-24 pb-32'>
            <div className=' w-full  flex flex-wrap justify-center'>
                {
                    data && data.map((item,index)=>(<Card key={index} plate={item} />))
                }
            </div>

        </div>
    </div>
  )
}
