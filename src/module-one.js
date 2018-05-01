
function ModuleOne(){
    return {
        hello: function(){
            console.log("Hello World from Module One!");
        }
    }
}

module.exports = new ModuleOne();