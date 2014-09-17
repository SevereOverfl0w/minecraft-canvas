mcCanvas = {
    config: {
        head: {
            posX: 8,
            posY: 8,
            width: 8,
            height: 8,
        },
        hat: {
            posX: 40,
            posY: 8,
            width: 8,
            height: 8,
        },
        body: {
            posX: 20,
            posY: 20,
            width: 8,
            height: 12,
        },
        leftLeg: {
            posX: 4,
            posY: 20,
            width: 4,
            height: 12,
        },
        rightLeg: {
            posX: 4,
            posY: 20,
            width: 4,
            height: 12,
        },
        leftArm: {
            posX: 44,
            posY: 20,
            width: 4,
            height: 12,
        },
        rightArm: {
            posX: 44,
            posY: 20,
            width: 4,
            height: 12,
        }
    },
    
    overrides: {
        face: {
            head: {
                destX: 0,
                destY: 0
            },
            hat: {
                destX: 0,
                destY: 0
            }
        },
        body: {
            head: {
                destX: 4,
                destY: 0
            },
            hat: {
                destX: 4,
                destY: 0
            },
            body: {
                destX: 4,
                destY: 8
            },
            leftLeg: {
                destX: 4,
                destY: 20
            },
            rightLeg: {
                destX: 8,
                destY: 20
            },
            leftArm: {
                destX: 0,
                destY: 8
            },
            rightArm: {
                destX: 12,
                destY: 8
            }
        }
    
    },
    
    renderMinecraft: function(style, element, options){
        var scale = options.scale;
        var canvas = document.createElement('canvas');
        canvas.classList = element.classList;
        canvas.id = element.id;
        config = this.config;
        overrides = this.overrides;
    
        element.addEventListener('load', function(){
            maxWidth = maxHeight = 0;
    
            for(var key in config){
                if(options[key] != undefined && options[key] != false || options[key] == undefined){
                    part = config[key];
                    override = overrides[style][key];
    
                    if (override != undefined){
                        partWidth = override.destX*scale + part.width*scale;
                        maxWidth = maxWidth < partWidth ? partWidth : maxWidth;
    
                        partHeight = override.destY*scale + part.height*scale;
                        maxHeight = maxHeight < partHeight ? partHeight : maxHeight;
                    }
                }
            }
    
            canvas.height = maxHeight;
            canvas.width = maxWidth;
    
            var ctx = canvas.getContext("2d");
    
            ctx.mozImageSmoothingEnabled = false;                           
            ctx.webkitImageSmoothingEnabled = false;                        
            ctx.msImageSmoothingEnabled = false;                            
            ctx.imageSmoothingEnabled = false;     
    
            for(var key in config){
                if(options[key] != undefined && options[key] != false || options[key] == undefined){
                    part = config[key];
                    override = overrides[style][key];
    
                    if (override != undefined) {
                        ctx.drawImage(this,
                                      part.posX, part.posY,
                                      part.width, part.height,
                                      override.destX*scale, override.destY*scale,
                                      part.width*scale, part.height*scale
                                     );
                    }
                }
            }
    
            parent = element.parentNode;
            parent.replaceChild(canvas, element);
        });
    
    }
}

if (window.jQuery || window.Zepto) {
    $.fn.renderMinecraft = function(style, options){
        this.each(function(){
            mcCanvas.renderMinecraft(this, options)
        });
    }
}
