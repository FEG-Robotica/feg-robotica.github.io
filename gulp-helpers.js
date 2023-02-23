function addTabs(sourceText, numOfTabs) {
    return sourceText.split('\n')
        .map(function (item) {
            const A_TAB = '    '
            let TAB_PREFIX = ''
            for (let i = 0; i < numOfTabs; i++) {
                TAB_PREFIX += A_TAB
            }
            if (item.trim() != '') {
                return TAB_PREFIX + item
            } else {
                return item
            }

        })
        .join('\n')
}


let makeSlideObj = (img, shortDescription) => {
    return {
        file: img,
        shortDescription: shortDescription,
    }
}

let makeSponsorObj = (name, logoURL, logoDescription, htmlContent) => {
    return {
        name: name,
        logoURL: logoURL,
        htmlContent: htmlContent,
        logoDescription: logoDescription
    }
}

export { addTabs, makeSlideObj, makeSponsorObj }