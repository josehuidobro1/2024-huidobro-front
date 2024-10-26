import React from 'react'
import NavBar from '../../components/NavBar'
import plate from '../../assets/imgHome.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Card from './components/Card'

const data = [
    {
        plate: 'Spaghetti Carbonara',
        ingredients: [
            { name: 'Spaghetti', amount: 200, measure_portion: 'gr' },
            { name: 'Eggs', amount: 2, measure_portion: 'units' },
            { name: 'Bacon', amount: 100, measure_portion: 'gr' },
            { name: 'Parmesan', amount: 50, measure_portion: 'gr' }
        ],
        scores: [5, 4, 4, 5, 3],
        comments: ['Delicious and creamy', 'Could use more bacon', 'Perfect balance of flavors']
    },
    {
        plate: 'Chicken Caesar Salad',
        ingredients: [
            { name: 'Chicken Breast', amount: 150, measure_portion: 'gr' },
            { name: 'Lettuce', amount: 1, measure_portion: 'head' },
            { name: 'Caesar Dressing', amount: 3, measure_portion: 'tbsp' },
            { name: 'Parmesan', amount: 20, measure_portion: 'gr' },
            { name: 'Croutons', amount: 50, measure_portion: 'gr' }
        ],
        scores: [4, 3, 5, 4, 2],
        comments: ['Fresh and crunchy', 'Too much dressing', 'Loved the chicken']
    },
    {
        plate: 'Beef Tacos',
        ingredients: [
            { name: 'Ground Beef', amount: 200, measure_portion: 'gr' },
            { name: 'Taco Shells', amount: 3, measure_portion: 'units' },
            { name: 'Cheese', amount: 50, measure_portion: 'gr' },
            { name: 'Lettuce', amount: 30, measure_portion: 'gr' },
            { name: 'Tomato', amount: 1, measure_portion: 'unit' }
        ],
        scores: [5, 5, 4, 4, 4],
        comments: ['So tasty and filling', 'Could use more spices', 'Loved the texture']
    },
    {
        plate: 'Margherita Pizza',
        ingredients: [
            { name: 'Pizza Dough', amount: 1, measure_portion: 'unit' },
            { name: 'Tomato Sauce', amount: 100, measure_portion: 'ml' },
            { name: 'Mozzarella', amount: 150, measure_portion: 'gr' },
            { name: 'Basil', amount: 10, measure_portion: 'leaves' }
        ],
        scores: [4, 5, 4, 5, 5],
        comments: ['Classic and simple', 'Love the fresh basil', 'Cheesy goodness']
    },
    {
        plate: 'Beef Stew',
        ingredients: [
            { name: 'Beef', amount: 300, measure_portion: 'gr' },
            { name: 'Potatoes', amount: 2, measure_portion: 'units' },
            { name: 'Carrots', amount: 2, measure_portion: 'units' },
            { name: 'Onion', amount: 1, measure_portion: 'unit' },
            { name: 'Beef Broth', amount: 500, measure_portion: 'ml' }
        ],
        scores: [3, 4, 3, 5, 5],
        comments: ['Warm and hearty', 'Great for winter', 'Very flavorful']
    },
    {
        plate: 'Greek Salad',
        ingredients: [
            { name: 'Cucumber', amount: 1, measure_portion: 'unit' },
            { name: 'Tomato', amount: 1, measure_portion: 'unit' },
            { name: 'Feta Cheese', amount: 50, measure_portion: 'gr' },
            { name: 'Olives', amount: 10, measure_portion: 'units' },
            { name: 'Olive Oil', amount: 1, measure_portion: 'tbsp' }
        ],
        scores: [5, 5, 4, 4, 3],
        comments: ['Super fresh', 'Perfect for summer', 'Loved the feta']
    },
    {
        plate: 'Pancakes with Syrup',
        ingredients: [
            { name: 'Pancake Mix', amount: 1, measure_portion: 'cup' },
            { name: 'Milk', amount: 1, measure_portion: 'cup' },
            { name: 'Egg', amount: 1, measure_portion: 'unit' },
            { name: 'Maple Syrup', amount: 2, measure_portion: 'tbsp' }
        ],
        scores: [5, 4, 5, 3, 4],
        comments: ['Fluffy and sweet', 'Could use more syrup', 'Perfect breakfast']
    },
    {
        plate: 'Tom Yum Soup',
        ingredients: [
            { name: 'Shrimp', amount: 100, measure_portion: 'gr' },
            { name: 'Mushrooms', amount: 50, measure_portion: 'gr' },
            { name: 'Tom Yum Paste', amount: 2, measure_portion: 'tbsp' },
            { name: 'Coconut Milk', amount: 200, measure_portion: 'ml' }
        ],
        scores: [4, 5, 4, 3, 5],
        comments: ['Spicy and exotic', 'Perfectly balanced flavors', 'Could be a bit creamier']
    },
    {
        plate: 'Fried Rice',
        ingredients: [
            { name: 'Rice', amount: 1, measure_portion: 'cup' },
            { name: 'Egg', amount: 1, measure_portion: 'unit' },
            { name: 'Peas', amount: 50, measure_portion: 'gr' },
            { name: 'Carrots', amount: 50, measure_portion: 'gr' },
            { name: 'Soy Sauce', amount: 1, measure_portion: 'tbsp' }
        ],
        scores: [4, 4, 3, 5, 5],
        comments: ['Simple yet tasty', 'Could use more vegetables', 'Love the texture']
    },
    {
        plate: 'Shrimp Scampi',
        ingredients: [
            { name: 'Shrimp', amount: 200, measure_portion: 'gr' },
            { name: 'Garlic', amount: 2, measure_portion: 'cloves' },
            { name: 'Butter', amount: 30, measure_portion: 'gr' },
            { name: 'Parsley', amount: 10, measure_portion: 'gr' },
            { name: 'Lemon Juice', amount: 1, measure_portion: 'tbsp' }
        ],
        scores: [5, 5, 4, 4, 5],
        comments: ['Garlicky and delicious', 'Perfect with pasta', 'Loved the lemon touch']
    },
    {
        plate: 'Avocado Toast',
        ingredients: [
            { name: 'Bread', amount: 2, measure_portion: 'slices' },
            { name: 'Avocado', amount: 1, measure_portion: 'unit' },
            { name: 'Salt', amount: 1, measure_portion: 'pinch' },
            { name: 'Olive Oil', amount: 1, measure_portion: 'tsp' }
        ],
        scores: [4, 5, 5, 4, 4],
        comments: ['Creamy and satisfying', 'A bit too simple', 'Perfect breakfast']
    },
    {
        plate: 'Grilled Salmon',
        ingredients: [
            { name: 'Salmon', amount: 200, measure_portion: 'gr' },
            { name: 'Lemon', amount: 1, measure_portion: 'unit' },
            { name: 'Salt', amount: 1, measure_portion: 'pinch' },
            { name: 'Black Pepper', amount: 1, measure_portion: 'pinch' }
        ],
        scores: [5, 4, 5, 5, 5],
        comments: ['Healthy and tasty', 'Perfectly grilled', 'Loved the lemon flavor']
    }
];


export const Community = () => {
  return (
    <div className="h-screen w-full overflow-y-hidden">
        <NavBar />
        <div className='w-full h-full flex justify-center items-start overflow-y-scroll font-quicksand mt-16 lg:mt-24 pb-32'>
            <div className=' w-10/12 flex flex-wrap justify-center'>
                {
                    data && data.map((item,index)=>(<Card key={index} plate={item} />))
                }
            </div>

        </div>
    </div>
  )
}
