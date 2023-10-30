// insert default menu items if not already present
const MenuItem = require('../../models/menuItem');
const menuItems = require('./menuItems.json');
const connection = require('../../DB/connection');

const Menu = async () => {
    // get the connection 
    const conn = await connection();
    const count = await MenuItem.countDocuments();
    // if there are no documents in the collection, then insert default menu items
    if(count < menuItems.length ){
        await MenuItem.deleteMany({});
        await MenuItem.insertMany(menuItems);
    }
    // return the menu items
    const menu = await MenuItem.find({});
    return menu;
}

module.exports = Menu;