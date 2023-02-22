function addTabs(sourceText, numOfTabs) {
    return sourceText.split('\n')
        .map(function (item) {
            const A_TAB = '    '
            let TAB_PREFIX = ''
            for (let i = 0; i < numOfTabs; i++) {
                TAB_PREFIX += A_TAB
            }
            return TAB_PREFIX + item
        })
        .join('\n')
}

let makeSlideObj = (file, shortDescription) => {
    return {
        file: file,
        shortDescription: shortDescription,
    }
}

export { addTabs, makeSlideObj }