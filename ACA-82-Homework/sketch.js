var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies;

var engine = Engine.create(),
    world = engine.world;


var render = Render.create({
    element:document.body,
    engine:engine,
    options:{
        width :1600,
        height:600,
        wireframes:false,
        background:'#FFE3E3',
    }
});

Render.run(render);


var runner = Runner.create();
Runner.run(runner, engine);

var squareStack = Composites.stack(40,60,4,4,0,0,function(x,y){
    return Bodies.rectangle(x,y,35,35,{
        render:{
            fillStyle :'#3DB2FF',
            strokeStyle :'black',
            lineWidth:2
        }
    });
});

var circleStack = Composites.stack(250,50,4,4,0,0,function(x,y){
    return Bodies.circle(x,y,Common.random(16,16),{
        friction:0,
        restitution:0,
        density:0.1,
        render:{fillStyle:'#A700FF',strokeStyle :'black',lineWidth:2}
    });
});

var triangleStack = Composites.pyramid(1100,40,9,8,0,0,function(x,y){
    return Bodies.polygon(x,y,3,18,{
        render:{fillStyle:'green',strokeStyle :'black',lineWidth:2}
    });
});

var octagonStack = Composites.pyramid(450,40,9,8,0,0,function(x,y){
    return Bodies.polygon(x,y,8,15,{
        render:{fillStyle:'yellow',strokeStyle :'black',lineWidth:2}
    });
});

var trapezoidStack =  Composites.stack(800,60,4,4,0,0,function(x,y){
    return Bodies.trapezoid(x,y,30,33,0.5,{
        render:{fillStyle:'red',strokeStyle :'black',lineWidth:2}
    });
});

ground = Bodies.rectangle(750,606,1600,58.5,{isStatic:true});
Composite.add(world, [ground,squareStack,circleStack,triangleStack,trapezoidStack,octagonStack]);


var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

Composite.add(world, mouseConstraint);
render.mouse = mouse;
