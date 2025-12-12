import SaxonJS from 'saxon-js';
import AdmZip from 'adm-zip';
import fetch from 'node-fetch';
import * as path from 'path';
import fs from 'fs-extra';

// create json XSLT from xml XSLT:
// xslt3 -xsl:build/transform.xsl -export:build/transform.sef.json -t -ns:##html5

const testVersion = '2023.1.0';
const download = 'https://repo1.maven.org/maven2/info/kuechler/bmf/taxapi/taxxmls/' + testVersion + '/taxxmls-' + testVersion + '.jar';
const unpackFolder = "build/unpacked";
const tsFolder = "build/ts";
const extraXmlSources = [
    {
        url: 'https://www.bmf-steuerrechner.de/javax.faces.resource/daten/xmls/Lohnsteuer2026.xml.xhtml',
        target: 'Lohnsteuer2026Big.xml'
    },
    {
        url: 'https://www.bmf-steuerrechner.de/javax.faces.resource/daten/xmls/Lohnsteuer2025.xml.xhtml',
        target: 'Lohnsteuer2025Big.xml'
    }
];

fetch(download).then(res => res.arrayBuffer())
    .then(arrayBuffer => Buffer.from(arrayBuffer))
    .then(buffer => {
        return new Promise(function (resolve, _reject) {
            var zip = new AdmZip(buffer);
            var zipEntries = zip.getEntries();
            var found = [];
            zipEntries.forEach(function (zipEntry) {
                if (zipEntry.entryName.endsWith("Big.xml")) {
                    zip.extractEntryTo(zipEntry.entryName, unpackFolder, false, true);
                    found.push(zipEntry.entryName);
                }
            });
            resolve(found);
        })
    }).then(xmlFileNames => {
        return new Promise(function (resolve, reject) {
            const dirPath = path.join(path.resolve(path.dirname('.')), unpackFolder);
            const xmlFileName = 'Lohnsteuer2023JanuarBig.xml';
            if (!xmlFileNames.includes(xmlFileName)) {
                resolve(xmlFileNames);
                return;
            }
            console.log('replace: ' + xmlFileName);
            const xmlPath = path.join(dirPath, xmlFileName);
            fs.readFile(xmlPath, 'utf8')
                .then(content => {
                    const updated = content.replace(/Lohnsteuer2023Big/g, 'Lohnsteuer2023JanuarBig');
                    if (updated === content) {
                        return;
                    }
                    return fs.writeFile(xmlPath, updated, 'utf8');
                })
                .then(() => resolve(xmlFileNames))
                .catch(err => reject(err));
        });
    }).then(xmlFileNames => {
        const dirPath = path.join(path.resolve(path.dirname('.')), unpackFolder);
        const downloads = extraXmlSources.map(source => {
            const targetPath = path.join(dirPath, source.target);
            if (fs.existsSync(targetPath)) {
                console.log('skip download (exists) ' + source.target);
                if (!xmlFileNames.includes(source.target)) {
                    xmlFileNames.push(source.target);
                }
                return Promise.resolve();
            }
            return fetch(source.url).then(res => {
                if (!res.ok) {
                    throw new Error('Failed to download ' + source.url + ' (' + res.status + ' ' + res.statusText + ')');
                }
                return res.text();
            }).then(content => fs.outputFile(targetPath, content)).then(() => {
                console.log('download ' + source.target + ' from ' + source.url);
                if (!xmlFileNames.includes(source.target)) {
                    xmlFileNames.push(source.target);
                }
            });
        });
        if (downloads.length === 0) {
            return xmlFileNames;
        }
        return Promise.all(downloads).then(() => xmlFileNames);
    }).then(xmlFileNames => {
        const dirPath = path.join(path.resolve(path.dirname('.')), tsFolder);
        console.log("outdir: " + dirPath);
        xmlFileNames.forEach(function (xmlFileName) {
            console.log("create " + xmlFileName);
            SaxonJS.transform({
                stylesheetFileName: "build/transform.sef.json",
                sourceFileName: unpackFolder + '/' + xmlFileName,
                destination: "file",
                baseOutputURI: "file://" + dirPath + '/' + String(xmlFileName).replace('.xml', '.ts')
            }, "sync");
        });
    });
