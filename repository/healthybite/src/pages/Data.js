
import { 
    faSquarePlus, faAppleAlt, faCarrot, faFish, faPizzaSlice, faIceCream, 
    faBreadSlice, faEgg, faCheese, faDrumstickBite, faHotdog, faHamburger, 
    faPepperHot, faCookie, faBacon, faLeaf, faSeedling, faLemon, 
    faWineBottle, faMugHot
} from '@fortawesome/free-solid-svg-icons';

const Data={
    achievements: {
        1: { 
            name: "Streak Starter", 
            subtitle:"3-Day Log",
            description: "Log your meals for 3 consecutive days to earn this trophy!" 
        },
        2: {
            name: "Healthy Habit",
            subtitle:"10-Day Log",
            description: "Stay consistent! Log your meals for 10 consecutive days to achieve this milestone.",
        },
        3: {
            name: "First Plate Logged!",
            description: "Congratulations! Add your very first plate to unlock this achievement.",
        },
        4: {
            name: "Aspiring Chef",
            subtitle:"5 Plates Logged",
            description: "Log 5 plates to show your culinary skills and earn this trophy!",
        },
        5: {
            name: "Master Chef",
            subtitle:"10 Plates Logged",
            description: "Prove your dedication by logging 10 plates to become a master chef!",
        },
        6: {
            name: "First Drink Logged!",
            description: "Start hydrating! Log your first drink to claim this achievement.",
        },
        7: {
            name: "Bartender in Training",
            subtitle:"5 Drinks Logged",
            description: "Mix it up! Log 5 drinks to show your bartending skills and earn this trophy.",
        },
        8: {
            name: "Master Bartender",
            subtitle: "10 Drinks Logged",
            description: "Cheers to progress! Log 10 drinks to prove you're a master at tracking beverages.",
        },
    },

    iconOptions : [
        { icon: faAppleAlt, name: 'Apple' },
        { icon: faCarrot, name: 'Carrot' },
        { icon: faFish, name: 'Fish' },
        { icon: faPizzaSlice, name: 'Pizza' },
        { icon: faIceCream, name: 'Ice Cream' },
        { icon: faBreadSlice, name: 'Bread' },
        { icon: faEgg, name: 'Egg' },
        { icon: faCheese, name: 'Cheese' },
        { icon: faDrumstickBite, name: 'Drumstick' },
        { icon: faHotdog, name: 'Hotdog' },
        { icon: faHamburger, name: 'Hamburger' },
        { icon: faPepperHot, name: 'Pepper' },
        { icon: faCookie, name: 'Cookie' },
        { icon: faBacon, name: 'Bacon' },
        { icon: faLeaf, name: 'Leaf' },
        { icon: faSeedling, name: 'Seedling' },
        { icon: faLemon, name: 'Lemon' },
        { icon: faWineBottle, name: 'Wine Bottle' },
        { icon: faMugHot, name: 'Mug' },
        {icon: faDrumstickBite, name:"Seedling"}
    ],
    goals:[
        {
            id:1,
            name:'calories'
        },
        {
            id:2,
            name:'sodium'
        },
        {
            id:3,
            name:'fats'
        },
        {
            id:4,
            name:'carbohydrates'
        },
        {
            id:5,
            name:'protein'
        },
        {
            id:6,
            name:'caffeine'
        },
        {
            id:7,
            name:'sugar'
        }
    ],
    

      
}
export default Data