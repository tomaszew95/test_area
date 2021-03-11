var pageContainer =  window.parent.document.getElementsByClassName("page-container");
var dataSpeedVariable = [21, 41, 54, 74, 84, 95, 98, 100];
var setAttr = false;
var layers;

(function(){
    'use strict';
    require.config({
        paths: {
            CerosSDK: '//sdk.ceros.com/standalone-player-sdk-v5.min'
        }
    });
    require(['CerosSDK'], function (CerosSDK) {
        CerosSDK.findExperience()
            .fail(function (error) {
                console.error(error);
            })
            .done(function (experience) {
                window.myExperience = experience;

                experience.on(CerosSDK.EVENTS.PAGE_CHANGED, pageChangedCallback);
                function pageChangedCallback(){
                    var parallaxName  = "parallax";
                    var parallaxGroupName  = "parallax-group";
                    var parallax = experience.findComponentsByTag(parallaxName);
                    var parallaxGroup = experience.findLayersByTag(parallaxGroupName);

                    var objectsNames = [parallaxName, parallaxName],
                        objects = [parallax, parallaxGroup];

                    for(var i = 0; i<objects.length; i++){
                        objects[i].layers.forEach(function(component){
                            var id = '#' + component.id;
                            $(id).addClass(objectsNames[i]);
                        }); 
                    }  
                    for(i=0; i<pageContainer.length; i++){
                        pageContainer[i].addEventListener("scroll", para); 
                    }
                    console.log(pageContainer);
                }
            })
    });
})();

function para() {
    layers = document.getElementsByClassName('parallax');
    var top = this.scrollTop;
    var layer, speed, yPos; 

    if(setAttr != true){
        var sortByZIndex = function(a, b){
            return b.style.zIndex - a.style.zIndex;
        }
        var sorted = $(layers).sort(sortByZIndex);
        for(var y = 0; y < sorted.length; y++){ 
            sorted[y].setAttribute("data-speed", dataSpeedVariable[y]);
        }
        setAttr = true;
    }
        
    for (var i = 0; i < layers.length; i++) {
        layer = layers[i];
        speed = layer.getAttribute('data-speed');
        yPos = (top * speed / 100);
        layer.style.transform = 'translate3d(0px, ' + yPos + 'px, 0px)';
    }
};
