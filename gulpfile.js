import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import replace from 'gulp-replace'
import {addTabs, makeSlideObj} from './gulp-helpers.js'


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
</p>`

// Seção 3 - Robôs

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

    // Output
    retval = retval.pipe(gulp.dest('./'))

    return retval
}

export {
    comprimeImagens as img,
    substitui as replace
}

export default function () {
    comprimeImagens()
    substitui()
}