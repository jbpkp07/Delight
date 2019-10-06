"use strict";


const rooms =
[
    { name: "Food" },
    { name: "Fitness" },
    { name: "Music" },
    { name: "Tech" },
    { name: "Movies" },
    { name: "Reading" },
    { name: "Gaming" },
    { name: "Fashion" },
    { name: "Travel" },
    { name: "Politics" },
    { name: "Sports" },
    { name: "Anime/Cartoons" }
];

const interests =
[
    { name: "Sushi", fk_room_id: 1 },
    { name: "Spaghetti", fk_room_id: 1 },
    { name: "Coffee", fk_room_id: 1 },
    { name: "Greek", fk_room_id: 1 },
    { name: "Ginger Shots", fk_room_id: 1 },
    { name: "Lasagna", fk_room_id: 1 },
    { name: "Tofu Scramble", fk_room_id: 1 },
    { name: "Kale Salads", fk_room_id: 1 },
    { name: "Smoothie", fk_room_id: 1 },
    { name: "IHOP Grand Slam", fk_room_id: 1 },

    { name: "Hiking", fk_room_id: 2 },
    { name: "Bodybuilding", fk_room_id: 2 },
    { name: "Calisthenics", fk_room_id: 2 },
    { name: "Jogging", fk_room_id: 2 },
    { name: "Yoga", fk_room_id: 2 },
    { name: "Pilates", fk_room_id: 2 },
    { name: "Cycling", fk_room_id: 2 },
    { name: "Martial Arts", fk_room_id: 2 },
    { name: "Water Aerobics", fk_room_id: 2 },
    { name: "Surfing", fk_room_id: 2 },

    { name: "Celine Dion", fk_room_id: 3 },
    { name: "Rihanna", fk_room_id: 3 },
    { name: "Drake", fk_room_id: 3 },
    { name: "The Rolling Stones", fk_room_id: 3 },
    { name: "Michael Jackson", fk_room_id: 3 },
    { name: "Elvis Presley", fk_room_id: 3 },
    { name: "Bob Dylan", fk_room_id: 3 },
    { name: "Eminem", fk_room_id: 3 },
    { name: "Jay-Z", fk_room_id: 3 },
    { name: "Beyonce", fk_room_id: 3 },

    { name: "Apple", fk_room_id: 4 },
    { name: "Android", fk_room_id: 4 },
    { name: "Facebook", fk_room_id: 4 },
    { name: "Snapchat", fk_room_id: 4 },
    { name: "Twitter", fk_room_id: 4 },
    { name: "Drones", fk_room_id: 4 },
    { name: "3D Printing", fk_room_id: 4 },
    { name: "Robotics", fk_room_id: 4 },
    { name: "Web Development", fk_room_id: 4 },
    { name: "Microsoft", fk_room_id: 4 },

    { name: "The Dark Knight", fk_room_id: 5 },
    { name: "Deadpool", fk_room_id: 5 },
    { name: "The Notebook", fk_room_id: 5 },
    { name: "Men In Black", fk_room_id: 5 },
    { name: "Avengers: Endgame", fk_room_id: 5 },
    { name: "IT", fk_room_id: 5 },
    { name: "Pulp Fiction", fk_room_id: 5 },
    { name: "Black Hawk Down", fk_room_id: 5 },
    { name: "The Shawshank Redemption", fk_room_id: 5 },
    { name: "Top Gun", fk_room_id: 5 },

    { name: "The Alchemist", fk_room_id: 6 },
    { name: "48 Laws of Power", fk_room_id: 6 },
    { name: "Harry Potter(Books)", fk_room_id: 6 },
    { name: "Sapiens(Book)", fk_room_id: 6 },
    { name: "The Power of Habit", fk_room_id: 6 },
    { name: "Aurora Rising", fk_room_id: 6 },
    { name: "The Handmaid's Tale", fk_room_id: 6 },
    { name: "The Hitchhiker's Guide to the Galaxy", fk_room_id: 6 },
    { name: "To Kill a Mockingbird", fk_room_id: 6 },
    { name: "Where the Wild Things Are", fk_room_id: 6 },

    { name: "Mario Kart", fk_room_id: 7 },
    { name: "Super Smash Bros.", fk_room_id: 7 },
    { name: "The Legend of Zelda", fk_room_id: 7 },
    { name: "Halo", fk_room_id: 7 },
    { name: "God of War", fk_room_id: 7 },
    { name: "Gears of War", fk_room_id: 7 },
    { name: "Xbox One", fk_room_id: 7 },
    { name: "Playstation 4", fk_room_id: 7 },
    { name: "The Elder Scrolls: Skyrim", fk_room_id: 7 },
    { name: "Call of Duty", fk_room_id: 7 },

    { name: "Air Jordans", fk_room_id: 8 },
    { name: "Louis Vuitton", fk_room_id: 8 },
    { name: "Red Bottoms", fk_room_id: 8 },
    { name: "Victoria's Secret", fk_room_id: 8 },
    { name: "Adidas", fk_room_id: 8 },
    { name: "Fashion Nova", fk_room_id: 8 },
    { name: "Fenty", fk_room_id: 8 },
    { name: "Yeezy", fk_room_id: 8 },
    { name: "Nike", fk_room_id: 8 },
    { name: "Bonobos", fk_room_id: 8 },

    { name: "AirBnB", fk_room_id: 9 },
    { name: "Japan", fk_room_id: 9 },
    { name: "Greece", fk_room_id: 9 },
    { name: "Egypt", fk_room_id: 9 },
    { name: "Italy", fk_room_id: 9 },
    { name: "London", fk_room_id: 9 },
    { name: "The Great Wall of China", fk_room_id: 9 },
    { name: "Iceland", fk_room_id: 9 },
    { name: "The Statue of Liberty", fk_room_id: 9 },
    { name: "Niagara Falls", fk_room_id: 9 },

    { name: "Donald Trump", fk_room_id: 10 },
    { name: "Barack Obama", fk_room_id: 10 },
    { name: "Nancy Pelosi", fk_room_id: 10 },
    { name: "Democrat", fk_room_id: 10 },
    { name: "Republican", fk_room_id: 10 },
    { name: "House of Representatives", fk_room_id: 10 },
    { name: "Supreme Court", fk_room_id: 10 },
    { name: "US Senate", fk_room_id: 10 },
    { name: "2020 Elections", fk_room_id: 10 },
    { name: "United Nations", fk_room_id: 10 },

    { name: "Football", fk_room_id: 11 },
    { name: "Basketball", fk_room_id: 11 },
    { name: "Tennis", fk_room_id: 11 },
    { name: "Soccer", fk_room_id: 11 },
    { name: "Golf", fk_room_id: 11 },
    { name: "Baseball", fk_room_id: 11 },
    { name: "Cricket", fk_room_id: 11 },
    { name: "Softball", fk_room_id: 11 },
    { name: "Rugby", fk_room_id: 11 },
    { name: "Volleyball", fk_room_id: 11 },
    
    { name: "My Hero Academia", fk_room_id: 12 },
    { name: "Dragon Ball Z", fk_room_id: 12 },
    { name: "Cowboy Bebop", fk_room_id: 12 },
    { name: "Fruits Basket", fk_room_id: 12 },
    { name: "Death Note", fk_room_id: 12 },
    { name: "Gurren Lagann", fk_room_id: 12 },
    { name: "Naruto", fk_room_id: 12 },
    { name: "Jojo's Bizarre Adventure", fk_room_id: 12 },
    { name: "The Seven Deadly Sins", fk_room_id: 12 },
    { name: "Ghost in the Shell", fk_room_id: 12 }
];

const users = 
[
    { name: "Griffin", password: "Griffin123" },
    { name: "Jeremy", password: "Jeremy123" },
    { name: "Martell", password: "Martell123"}
];

const messages = 
[
    { fk_room_id: 1, fk_user_id: 1, message: "Hi, I am Griffin."},
    { fk_room_id: 1, fk_user_id: 2, message: "Hi, I am Jeremy."},
    { fk_room_id: 1, fk_user_id: 3, message: "Hi, I am Martell."}
];


module.exports =
{
    rooms,
    interests,
    users,
    messages
};