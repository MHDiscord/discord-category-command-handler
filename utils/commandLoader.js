const fs = require('fs');
const path = require('path');

const flatten = (lists) => {
    return lists.reduce((a, b) => a.concat(b), []);
}

const getDirectories = (srcpath) => {
    return fs.readdirSync(srcpath)
        .map(file => path.join(srcpath, file))
        .filter(path => fs.statSync(path)
            .isDirectory());
}

const getDirectoriesRecursive = (srcpath) => {
    return [srcpath, ...flatten(getDirectories(srcpath)
        .map(getDirectoriesRecursive))];
}


module.exports.run = async (client) => {

    const categories = getDirectoriesRecursive('./commands')
        .map((value) => value.replace(/\\/g, '/')
            .replace(/\/{2}/g, '/')
            .replace(/^\w/g, './c'));

    client.commands = {
        main: {}
    };

    for (let i = 0; i < categories.length; i++) {

        const category = categories[i];
        let commands = fs.readdirSync(category);

        commands.forEach((command) => {
            fs.stat(`${category}/${command}`, (err, stats) => {

                if (err) throw err;
                if (stats.isDirectory()) return;

                let depth = category.split(/\//g)
                    .slice(2)
                    .length;
                let comName = command.split(/(\b\.\b)(?!.*\1)/g)[0];
                let catName = category.split(/\//g)[2];
                let subCatName = category.split(/\//g)[3];
                let subSubCatName = category.split(/\//g)[4];

                console.log(`Command ${ category }/${ command } loaded.`)


                switch (depth) {
                    case 0: {
                        client.commands.main[command.split(/(\b\.\b)(?!.*\1)/g)[0]] = require(`../${category}/${command}`);

                        break;
                    }

                    case 1: {
                        if (!client.commands[catName]) client.commands[catName] = {};

                        client.commands[catName][comName] = require(`../${category}/${command}`);
                        break;
                    }

                    case 2: {
                        if (!client.commands[catName]) client.commands[catName] = {};
                        if (!client.commands[catName][subCatName]) client.commands[catName][subCatName] = {};

                        client.commands[catName][subCatName][comName] = require(`../${category}/${command}`);
                        break;
                    }

                    case 3: {
                        if (!client.commands[catName]) client.commands[catName] = {};
                        if (!client.commands[catName][subCatName]) client.commands[catName][subCatName] = {};
                        if (!client.commands[catName][subCatName][subSubCatName]) client.commands[catName][subCatName][subSubCatName] = {};

                        client.commands[catName][subCatName][subSubCatName][comName] = require(`../${category}/${command}`);
                        break;
                    }

                    default:
                        break;
                }
            });
        });
    }
}