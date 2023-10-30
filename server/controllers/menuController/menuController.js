const { Menu } = require("../../services");

const MenuController = {
    async getMenu(req , res , next){
        const menu = await Menu();
        if(menu){
            res.send(menu);
        }else{
            res.send({ error: "No menu found" })
        }
    }
    
}

module.exports = MenuController;