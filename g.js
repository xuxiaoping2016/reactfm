const fs = require('fs');
const path = require('path');

function mkdirs(dirPath) {
    if (!fs.existsSync(path.dirname(dirPath))) {
        mkdirs(path.dirname(dirPath));
    }
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
}

function copy(fromPath, modulePath) {
    mkdirs(modulePath);
    fs.readdirSync(fromPath).forEach(name => {
        const dirPath = `${fromPath}/${name}`;
        const toPath = `${modulePath}/${name}`;
        if (fs.statSync(dirPath).isDirectory()) {
            copy(dirPath, toPath);
        } else {
            fs.writeFileSync(toPath, fs.readFileSync(dirPath));
        }
    });
}

const config = {
    page: {
        from: 'template/page',
        to: 'src/pages',
    },
    component: {
        from: 'template/component',
        to: 'src/components',
    },
};

function task() {
    const [type, name] = process.argv.slice(2);
    const note = config[type];
    const modulePath = `${note.to}/${name}`;
    if (!note) {
        console.log(`${type} is not available!`);
        return;
    }

    if (fs.existsSync(modulePath)) {
        console.log(`${type} ${name} already exsit!`);
        return;
    }

    copy(note.from, modulePath);
    console.log(`successfully generate ${type} ${name}`);
}

task();
