import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import replace from 'gulp-replace'
import { addTabs, makeMemberObj, makeSlideObj, makeSponsorObj } from './gulp-helpers.js'

// Seção 0 - Contato
const EMAIL_FEG_ROBOTICA = 'insiraemailaqui@gmail.com'
const LINK_FACEBOOK = 'https://facebook.com/insirafegrobotica'
const LINK_INSTAGRAM = 'https://instagram.com/@insirafegrobotica'
const LINK_GITHUB = 'https://github.com/insirafegrobotica'
const ENDERECO = 'Av. Dr. Ariberto Pereira da Cunha, 333, bloco 4, sala XXX'

// Seção 1 - Slides
let slides = []
slides.push(makeSlideObj('img/sample_16x9.png', 'Foto da equipe trabalhando'))
slides.push(makeSlideObj('img/sample_16x9.png', 'Foto do projeto social'))
slides.push(makeSlideObj('img/sample_16x9.png', 'Foto numa competição'))

// Seção 2 - Sobre
const SOBRE_IMG_URL = 'img/sample_16x9.png'
const SOBRE_IMG_DESCR = 'Foto da equipe reunida'
let SOBRE_TEXTO_HTML = `
<p>
    Somos a equipe de robótica da
    <a href="#">FEG</a>, um dos campi da Unesp. <br><br>

    Desde 2011, participamos de diversas competições nas
    categorias sumô e seguidor de linha. <br>
    Além disso, temos outros projetos como o <a href="#projetos">Robô UV</a>
    e o nosso <a href="#projetos">Projeto Social</a>.
</p>` // TODO: Por o link da FEG

// Seção 3 - Robôs
const FOTO_HACHIKO = 'img/sample_16x9.png'
const FOTO_LOBA = 'img/sample_16x9.png'
const FOTO_SONIC = 'img/sample_16x9.png'
const FOTO_SOMBRA = 'img/sample_16x9.png'
const FOTO_TONTO = 'img/sample_16x9.png'

let TEXTO_HTML_HACHIKO = `
Robô sumô - 3kg
`

let TEXTO_HTML_LOBA = `
Robô sumô - 3kg
`

let TEXTO_HTML_SONIC = `
Robô sumô - 500g
`

let TEXTO_HTML_SOMBRA = `
Robô sumô - 500g
`

let TEXTO_HTML_TONTO = `
Robô seguidor de linha
`

// Seção 4 - Projetos
const FOTO_ROBO_UV = 'img/sample_16x9.png'
const FOTO_PROJ_SOCIAL = 'img/sample_16x9.png'

let TEXTO_HTML_PROJ_ROBO_UV = `
Projeto idealizado durante a pandemia do covid-19 com o objetivo de [...]
`
let TEXTO_HTML_PROJ_SOCIAL = `
Projeto desde &lt;ano&gt; com o fim de trazer [...]
`

// Seção 5 - parcerias/patrocinios
let patrocinios = []
patrocinios.push(makeSponsorObj(
    'Empresa A',
    'img/sample_16x9.png',
    'Logotipo da empresa A',
    'Desde 2011 a <a href="#">Empresa A</a> nos apoia [...]'
))
patrocinios.push(makeSponsorObj(
    'Empresa B',
    'img/sample_16x9.png',
    'Logotipo da empresa B',
    'Desde 2011 a <a href="#">Empresa B</a> nos apoia [...]'
))
patrocinios.push(makeSponsorObj(
    'Empresa C',
    'img/sample_16x9.png',
    'Logotipo da empresa C',
    'Desde 2011 a <a href="#">Empresa C</a> nos apoia [...]'
))
patrocinios.push(makeSponsorObj(
    'Empresa D',
    'img/sample_16x9.png',
    'Logotipo da empresa D',
    'Desde 2011 a <a href="#">Empresa D</a> nos apoia [...]'
))

// Seção 6 - Membros
let membrosCapitania = []
let membrosEletronica = []
let membrosProgramacao = []
let membrosMecanica = []
let membrosMarketing = []
let membrosAnteriores = []

let templateMembro = makeMemberObj(
    'Nome da pessoa',
    'img/sample_3x4.png',
    'Engenharia de produção',
    'Na equipe desde 2011',
    'mail@gmail.com',
    'https://linkdofb.com',
    `https://linkdoinsta.com`,
    `https://linkdogithub.com`,
    null // preencher apenas para membros anteriores
    // e.g.
    // 'Participou da Programação e da Mecânica'
)
membrosCapitania.push(templateMembro)
membrosCapitania.push(templateMembro)
membrosCapitania.push(templateMembro)
membrosCapitania.push(templateMembro)

membrosEletronica.push(templateMembro)
membrosProgramacao.push(templateMembro)
membrosMecanica.push(templateMembro)
membrosMarketing.push(templateMembro)

membrosAnteriores.push(makeMemberObj(
    'Nome da pessoa',
    'img/sample_3x4.png',
    'Engenharia de produção',
    'Na equipe de 2011 a 2013',
    'mail@gmail.com',
    'https://linkdofb.com',
    `https://linkdoinsta.com`,
    `https://linkdogithub.com`,
    `Na Mecânica em 2011<br>\n
    Na Programação de 2012 a 2013`
))

// A partir daqui volta a ser código, pode ignorar
function replaceSlides() {
    if (slides.length == 0) {
        console.log('nenhum slide detectado, seção de slides excluída dessa build')
        return ''
    }

    let retval = `<div class="carousel slide" data-bs-ride="carousel" id="carousel">
                <div class="carousel-inner">`

    slides.forEach(function (slideObj, indice) {
        retval +=
            `
                    <div class="carousel-item@@IS_ACTIVE">
                        <img src="@@IMAGE_SRC" class="d-block w-50 mx-auto" alt="@@IMAGE_DESCR">
                    </div>`
                .replace('@@IS_ACTIVE', (indice == 0 ? ' active' : ''))
                .replace('@@IMAGE_SRC', slideObj.file)
                .replace('@@IMAGE_DESCR', slideObj.shortDescription)
    })

    retval += `             
                    <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon"></span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                        <span class="carousel-control-next-icon"></span>
                    </button>
                    <div class="carousel-indicators">`

    slides.forEach(function (slideObj, indice) {
        retval +=
            `
                        <button data-bs-target="#carousel" type="button" data-bs-slide-to="@@INDICE"@@IS_ACTIVE></button>`
                .replace('@@INDICE', indice)
                .replace('@@IS_ACTIVE', (indice == 0 ? ' class="active"' : ''))
    })

    retval += `
                    </div>
                </div>
    `
    return retval
}

function geraHtmlPatrocinios() {
    let retval = ''
    patrocinios.forEach(function (item, indice) {
        const name = item.name
        const logo = item.logoURL
        const imgAltText = item.logoDescription
        const text = item.htmlContent

        // Começo da row de 3 itens
        if (indice % 3 == 0) {
            retval += addTabs('<div class="row mt-4 text-center">\n', (indice == 0 ? 0 : 4))
        }

        // Construção do item
        retval += addTabs('<div class="col-md-4">\n', 5)
        retval += addTabs(`<img src="${logo}" alt="${imgAltText}" class="d-block w-75 mx-auto rounded mb-2">\n`, 6)
        retval += addTabs(`<h3 class="section-title text-colored fs-4">\n`, 6)
        retval += addTabs(`${name}\n`, 7)
        retval += addTabs(`</h3>\n`, 6)
        retval += addTabs(`<p>\n`, 6)
        retval += addTabs(`${text}\n`, 7)
        retval += addTabs(`</p>\n`, 6)
        retval += addTabs(`</div>\n`, 5)

        // Fim da row
        if (indice % 3 == 2 || indice == (patrocinios.length - 1)) {
            retval += addTabs('</div>\n', 4)
        }
    })

    return retval;
}

// TODO: Adaptar para funcionar com membros anteriores tambem
function geraHtmlMembros(listaDeMembros) {
    let retvalHtml = ''

    if(listaDeMembros.length == 0) {
        retvalHtml += addTabs('<div class="col-md-12">\n', 9)
        retvalHtml += addTabs('<b>Não foram registrados membros nessa seção ainda!</b>\n', 10)
        retvalHtml += addTabs('</div>\n', 9)
        return retvalHtml
    }

    listaDeMembros.forEach(function (membro) {
        retvalHtml += addTabs('<div class="col-md-3 text-center">\n', 9)
        retvalHtml += addTabs(`<img src="${membro.foto}" alt="Foto de ${membro.nome}" class="d-block w-50 mx-auto">\n`, 10)
        retvalHtml += addTabs(`<h5 class="text-colored fw-bold mt-2">${membro.nome}</h5>\n`, 10)
        retvalHtml += addTabs(`<p>\n`, 10)
        retvalHtml += addTabs(`${membro.curso}<br>\n`, 11)
        retvalHtml += addTabs(`${membro.desdeAno}\n`, 11)
        if(membro.equipes != null) {
            retvalHtml += addTabs(`<br>${membro.equipes}\n`, 11)
        }
        retvalHtml += addTabs(`</p>\n`, 10)

        let links = []
        if (membro.email != null) { links.push([membro.email, "email"]) }
        if (membro.facebook != null) { links.push([membro.facebook, "fb"]) }
        if (membro.instagram != null) { links.push([membro.instagram, "ig"]) }
        if (membro.github != null) { links.push([membro.github, "github"]) }

        if (links.length == 0) {
            retvalHtml += addTabs(`</div>\n`, 9)
            return
        }

        retvalHtml += addTabs(`<ul class="social-links ps-0">\n`, 10)
        let getIconByLinkType = (type) => {
            if (type == 'email') { return '<i class="bi bi-envelope-at text-colored"></i>\n' }
            else if (type == 'fb') { return '<i class="bi bi-facebook text-colored"></i>\n' }
            else if (type == 'ig') { return '<i class="bi bi-instagram text-colored"></i>\n' }
            else if (type == 'github') { return '<i class="bi bi-github text-colored"></i>\n' }
        }
        for (let i = 0; i < links.length; i++) {
            let optionalMarginEnd = (i != (links.length-1)) ? ' me-2' : ''
            let linkObj = links[i]
            let link = linkObj[0]
            let linkType = linkObj[1]

            retvalHtml += addTabs(`<li class="fs-5${optionalMarginEnd}">\n`, 11)
            retvalHtml += addTabs(`<a href="${link}">\n`, 12)
            retvalHtml += addTabs(getIconByLinkType(linkType), 13)
            retvalHtml += addTabs(`</a>\n`, 12)
            retvalHtml += addTabs(`</li>\n`, 11)
        }
        retvalHtml += addTabs(`</ul>\n`, 10)
        retvalHtml += addTabs(`</div>\n`, 9)
    })

    return retvalHtml
}

let comprimeImagens = function () {
    return gulp.src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./img/'))
}

let substitui = function () {
    let retval = gulp.src('./src/index.html')

    // Substituir seção de slides
    retval = retval.pipe(replace('@@SLIDES', replaceSlides()))

    // Substituir seção sobre
    SOBRE_TEXTO_HTML = addTabs(SOBRE_TEXTO_HTML, 6)
    retval = retval.pipe(replace('@@SOBRE_IMG_URL', SOBRE_IMG_URL))
    retval = retval.pipe(replace('@@SOBRE_IMG_DESCR', SOBRE_IMG_DESCR))
    retval = retval.pipe(replace('@@SOBRE_TEXTO_HTML', SOBRE_TEXTO_HTML))

    // Substituir seção robôs
    TEXTO_HTML_HACHIKO = addTabs(TEXTO_HTML_HACHIKO, 7)
    TEXTO_HTML_LOBA = addTabs(TEXTO_HTML_LOBA, 7)
    TEXTO_HTML_SOMBRA = addTabs(TEXTO_HTML_SOMBRA, 7)
    TEXTO_HTML_SONIC = addTabs(TEXTO_HTML_SONIC, 7)
    TEXTO_HTML_TONTO = addTabs(TEXTO_HTML_TONTO, 7)

    retval = retval.pipe(replace('@@FOTO_HACHIKO', FOTO_HACHIKO))
    retval = retval.pipe(replace('@@FOTO_LOBA', FOTO_LOBA))
    retval = retval.pipe(replace('@@FOTO_SOMBRA', FOTO_SOMBRA))
    retval = retval.pipe(replace('@@FOTO_SONIC', FOTO_SONIC))
    retval = retval.pipe(replace('@@FOTO_TONTO', FOTO_TONTO))

    retval = retval.pipe(replace('@@TEXTO_HTML_HACHIKO', TEXTO_HTML_HACHIKO))
    retval = retval.pipe(replace('@@TEXTO_HTML_LOBA', TEXTO_HTML_LOBA))
    retval = retval.pipe(replace('@@TEXTO_HTML_SOMBRA', TEXTO_HTML_SOMBRA))
    retval = retval.pipe(replace('@@TEXTO_HTML_SONIC', TEXTO_HTML_SONIC))
    retval = retval.pipe(replace('@@TEXTO_HTML_TONTO', TEXTO_HTML_TONTO))

    // Substituir seção projetos
    TEXTO_HTML_PROJ_ROBO_UV = addTabs(TEXTO_HTML_PROJ_ROBO_UV, 7)
    TEXTO_HTML_PROJ_SOCIAL = addTabs(TEXTO_HTML_PROJ_SOCIAL, 7)

    retval = retval.pipe(replace('@@FOTO_ROBO_UV', FOTO_ROBO_UV))
    retval = retval.pipe(replace('@@FOTO_PROJ_SOCIAL', FOTO_PROJ_SOCIAL))

    retval = retval.pipe(replace('@@TEXTO_HTML_PROJ_ROBO_UV', TEXTO_HTML_PROJ_ROBO_UV))
    retval = retval.pipe(replace('@@TEXTO_HTML_PROJ_SOCIAL', TEXTO_HTML_PROJ_SOCIAL))

    // Substituir seção patrocinios
    retval = retval.pipe(replace('@@PATROCINIOS', geraHtmlPatrocinios()))

    // Substituir seções de membros
    retval = retval.pipe(replace('@@EQUIPE_ATUAL_MEMBROS_CAPITANIA', geraHtmlMembros(membrosCapitania)))
    retval = retval.pipe(replace('@@EQUIPE_ATUAL_MEMBROS_ELETRONICA', geraHtmlMembros(membrosEletronica)))
    retval = retval.pipe(replace('@@EQUIPE_ATUAL_MEMBROS_DEV', geraHtmlMembros(membrosProgramacao)))
    retval = retval.pipe(replace('@@EQUIPE_ATUAL_MEMBROS_MECANICA', geraHtmlMembros(membrosMecanica)))
    retval = retval.pipe(replace('@@EQUIPE_ATUAL_MEMBROS_MARKETING', geraHtmlMembros(membrosMarketing)))
    retval = retval.pipe(replace('@@EQUIPE_MEMBROS_ANTERIORES', geraHtmlMembros(membrosAnteriores)))

    // Substituir seção de contato
    retval = retval.pipe(replace('@@EMAIL_FEG_ROBOTICA', EMAIL_FEG_ROBOTICA))
    retval = retval.pipe(replace('@@LINK_FACEBOOK', LINK_FACEBOOK))
    retval = retval.pipe(replace('@@LINK_INSTAGRAM', LINK_INSTAGRAM))
    retval = retval.pipe(replace('@@LINK_GITHUB', LINK_GITHUB))
    retval = retval.pipe(replace('@@ENDERECO', ENDERECO))

    // Output
    retval = retval.pipe(gulp.dest('./'))

    return retval
}

export {
    comprimeImagens as img,
    substitui as replace
}

export default function (cb) {
    comprimeImagens()
    substitui()
    cb()
}