mcCanvas = {
    config: {
        head: {
            posX: 8,
            posY: 8,
            width: 8,
            height: 8,
            destX: 4,
            destY: 0
        },
        hat: {
            posX: 40,
            posY: 8,
            width: 8,
            height: 8,
            destX: 4,
            destY: 0
        },
        body: {
            posX: 20,
            posY: 20,
            width: 8,
            height: 12,
            destX: 4,
            destY: 8
        },
        leftLeg: {
            posX: 4,
            posY: 20,
            width: 4,
            height: 12,
            destX: 4,
            destY: 20
        },
        rightLeg: {
            posX: 4,
            posY: 20,
            width: 4,
            height: 12,
            destX: 8,
            destY: 20
        },
        leftArm: {
            posX: 44,
            posY: 20,
            width: 4,
            height: 12,
            destX: 0,
            destY: 8
        },
        rightArm: {
            posX: 44,
            posY: 20,
            width: 4,
            height: 12,
            destX: 12,
            destY: 8
        }
    },
    
    renderSkin: function(element, options){
        scale = options.scale;
        var canvas = document.createElement('canvas');
        canvas.classList = element.classList;
        canvas.id = element.id;
    
        canvas.width = (this.config.leftArm.width + this.config.body.width + this.config.rightArm.width)*scale;
        canvas.height = (this.config.head.height + this.config.body.height + this.config.leftLeg.height)*scale;
        config = this.config
    
        element.onload = function(){
            ctx = canvas.getContext("2d");
    
            ctx.mozImageSmoothingEnabled = false;                           
            ctx.webkitImageSmoothingEnabled = false;                        
            ctx.msImageSmoothingEnabled = false;                            
            ctx.imageSmoothingEnabled = false;     
    
            for(var key in config){
                if(options[key] != undefined && options[key] != false || options[key] == undefined){
                    part = config[key];
                    ctx.drawImage(this,
                                  part.posX, part.posY,
                                  part.width, part.height,
                                  part.destX*scale, part.destY*scale,
                                  part.width*scale, part.height*scale
                                 );
                }
            }
    
            parent = element.parentNode;
            parent.replaceChild(canvas, element);
        };
    
    },
    
    renderFace: function(element, options){
        scale = options.scale;
        var canvas = document.createElement('canvas');
        canvas.classList = element.classList;
        canvas.id = element.id;
    
        canvas.width = this.config.head.width*scale;
        canvas.height = this.config.head.height*scale;

        config = this.config;
    
        element.onload = function(){
            ctx = canvas.getContext("2d");
    
            ctx.mozImageSmoothingEnabled = false;                           
            ctx.webkitImageSmoothingEnabled = false;                        
            ctx.msImageSmoothingEnabled = false;                            
            ctx.imageSmoothingEnabled = false;     
    
            faceConfig = {};
            faceConfig.head = config.head;
            faceConfig.hat = config.hat;
    
            for(var key in faceConfig){
                if(options[key] != undefined && options[key] != false || options[key] == undefined){
                    part = faceConfig[key];
                    ctx.drawImage(this,
                                  part.posX, part.posY,
                                  part.width, part.height,
                                  0*scale, 0*scale,
                                  part.width*scale, part.height*scale
                                 );
                }
            }
    
            parent = element.parentNode;
            parent.replaceChild(canvas, element);
        };
    }
}

if (window.jQuery || window.Zepto) {
    $.fn.renderSkin = function(options){
        this.each(function(){
            mcCanvas.renderSkin(this, options)
        });
    }

    $.fn.renderFace = function(options){
        this.each(function(){
            mcCanvas.renderFace(this, options)
        });
    }

}
