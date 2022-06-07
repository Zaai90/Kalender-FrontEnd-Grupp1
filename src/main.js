document.addEventListener('DOMContentLoaded', main);

function main()
{
    createHelloWorld();
}

function createHelloWorld()
{
    document.body.appendChild(document.createElement('div')).classList = 'container';
    document.getElementsByClassName('container')[0].appendChild(document.createElement('p')).append('Hello World!');
}