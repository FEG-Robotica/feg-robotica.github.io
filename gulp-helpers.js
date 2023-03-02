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

let makeMemberObj = (nome, foto, curso, desdeAno, linkedin, email, facebook, instagram, github, equipes) => {
    return {
        nome: nome,
        foto: foto,
        curso: curso,
        desdeAno: desdeAno,
        linkedin: linkedin,
        email: email,
        facebook: facebook,
        instagram: instagram,
        github: github,
        equipes: equipes // Para membros anteriores
    }
}

export { addTabs, makeSlideObj, makeSponsorObj, makeMemberObj }