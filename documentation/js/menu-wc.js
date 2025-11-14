'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-basic documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-6d26a5c023cf840e20cf97d53aca919655f684250fda36f3d2200fb86ba1e593df81a7995035e2f324824d87bdfb304d96338e12f88558e5321788f4d2f776b9"' : 'data-bs-target="#xs-controllers-links-module-AppModule-6d26a5c023cf840e20cf97d53aca919655f684250fda36f3d2200fb86ba1e593df81a7995035e2f324824d87bdfb304d96338e12f88558e5321788f4d2f776b9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-6d26a5c023cf840e20cf97d53aca919655f684250fda36f3d2200fb86ba1e593df81a7995035e2f324824d87bdfb304d96338e12f88558e5321788f4d2f776b9"' :
                                            'id="xs-controllers-links-module-AppModule-6d26a5c023cf840e20cf97d53aca919655f684250fda36f3d2200fb86ba1e593df81a7995035e2f324824d87bdfb304d96338e12f88558e5321788f4d2f776b9"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-6d26a5c023cf840e20cf97d53aca919655f684250fda36f3d2200fb86ba1e593df81a7995035e2f324824d87bdfb304d96338e12f88558e5321788f4d2f776b9"' : 'data-bs-target="#xs-injectables-links-module-AppModule-6d26a5c023cf840e20cf97d53aca919655f684250fda36f3d2200fb86ba1e593df81a7995035e2f324824d87bdfb304d96338e12f88558e5321788f4d2f776b9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-6d26a5c023cf840e20cf97d53aca919655f684250fda36f3d2200fb86ba1e593df81a7995035e2f324824d87bdfb304d96338e12f88558e5321788f4d2f776b9"' :
                                        'id="xs-injectables-links-module-AppModule-6d26a5c023cf840e20cf97d53aca919655f684250fda36f3d2200fb86ba1e593df81a7995035e2f324824d87bdfb304d96338e12f88558e5321788f4d2f776b9"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-b34c9bf67955afef6a85708706c31f027736022afdeda32adcf223f64f2e6b9d2507a9dc777eeee79b22401430be1a91c3333cefc9824a04870680934811c27b"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-b34c9bf67955afef6a85708706c31f027736022afdeda32adcf223f64f2e6b9d2507a9dc777eeee79b22401430be1a91c3333cefc9824a04870680934811c27b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-b34c9bf67955afef6a85708706c31f027736022afdeda32adcf223f64f2e6b9d2507a9dc777eeee79b22401430be1a91c3333cefc9824a04870680934811c27b"' :
                                            'id="xs-controllers-links-module-AuthModule-b34c9bf67955afef6a85708706c31f027736022afdeda32adcf223f64f2e6b9d2507a9dc777eeee79b22401430be1a91c3333cefc9824a04870680934811c27b"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-b34c9bf67955afef6a85708706c31f027736022afdeda32adcf223f64f2e6b9d2507a9dc777eeee79b22401430be1a91c3333cefc9824a04870680934811c27b"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-b34c9bf67955afef6a85708706c31f027736022afdeda32adcf223f64f2e6b9d2507a9dc777eeee79b22401430be1a91c3333cefc9824a04870680934811c27b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-b34c9bf67955afef6a85708706c31f027736022afdeda32adcf223f64f2e6b9d2507a9dc777eeee79b22401430be1a91c3333cefc9824a04870680934811c27b"' :
                                        'id="xs-injectables-links-module-AuthModule-b34c9bf67955afef6a85708706c31f027736022afdeda32adcf223f64f2e6b9d2507a9dc777eeee79b22401430be1a91c3333cefc9824a04870680934811c27b"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CompaniesModule.html" data-type="entity-link" >CompaniesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CompaniesModule-87c6d0ad800aeb355a118af39b870c211f0ea5d0eb6ce1d6533c1f547e4f38540651591b9c6e69dff8761ca726b69d8b1089b03f06626d351a7737b1aadac8d7"' : 'data-bs-target="#xs-controllers-links-module-CompaniesModule-87c6d0ad800aeb355a118af39b870c211f0ea5d0eb6ce1d6533c1f547e4f38540651591b9c6e69dff8761ca726b69d8b1089b03f06626d351a7737b1aadac8d7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CompaniesModule-87c6d0ad800aeb355a118af39b870c211f0ea5d0eb6ce1d6533c1f547e4f38540651591b9c6e69dff8761ca726b69d8b1089b03f06626d351a7737b1aadac8d7"' :
                                            'id="xs-controllers-links-module-CompaniesModule-87c6d0ad800aeb355a118af39b870c211f0ea5d0eb6ce1d6533c1f547e4f38540651591b9c6e69dff8761ca726b69d8b1089b03f06626d351a7737b1aadac8d7"' }>
                                            <li class="link">
                                                <a href="controllers/CompaniesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompaniesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CompaniesModule-87c6d0ad800aeb355a118af39b870c211f0ea5d0eb6ce1d6533c1f547e4f38540651591b9c6e69dff8761ca726b69d8b1089b03f06626d351a7737b1aadac8d7"' : 'data-bs-target="#xs-injectables-links-module-CompaniesModule-87c6d0ad800aeb355a118af39b870c211f0ea5d0eb6ce1d6533c1f547e4f38540651591b9c6e69dff8761ca726b69d8b1089b03f06626d351a7737b1aadac8d7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CompaniesModule-87c6d0ad800aeb355a118af39b870c211f0ea5d0eb6ce1d6533c1f547e4f38540651591b9c6e69dff8761ca726b69d8b1089b03f06626d351a7737b1aadac8d7"' :
                                        'id="xs-injectables-links-module-CompaniesModule-87c6d0ad800aeb355a118af39b870c211f0ea5d0eb6ce1d6533c1f547e4f38540651591b9c6e69dff8761ca726b69d8b1089b03f06626d351a7737b1aadac8d7"' }>
                                        <li class="link">
                                            <a href="injectables/CompaniesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompaniesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabasesModule.html" data-type="entity-link" >DatabasesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DatabasesModule-676ff766479681d888b7e1fec9cfb772c052e696d2f0c454706033cf8114fc8f1b167788acdff4ce13efaa0e0ea030d6d2f03b164720b1238d925e35bd255762"' : 'data-bs-target="#xs-controllers-links-module-DatabasesModule-676ff766479681d888b7e1fec9cfb772c052e696d2f0c454706033cf8114fc8f1b167788acdff4ce13efaa0e0ea030d6d2f03b164720b1238d925e35bd255762"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DatabasesModule-676ff766479681d888b7e1fec9cfb772c052e696d2f0c454706033cf8114fc8f1b167788acdff4ce13efaa0e0ea030d6d2f03b164720b1238d925e35bd255762"' :
                                            'id="xs-controllers-links-module-DatabasesModule-676ff766479681d888b7e1fec9cfb772c052e696d2f0c454706033cf8114fc8f1b167788acdff4ce13efaa0e0ea030d6d2f03b164720b1238d925e35bd255762"' }>
                                            <li class="link">
                                                <a href="controllers/DatabasesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DatabasesModule-676ff766479681d888b7e1fec9cfb772c052e696d2f0c454706033cf8114fc8f1b167788acdff4ce13efaa0e0ea030d6d2f03b164720b1238d925e35bd255762"' : 'data-bs-target="#xs-injectables-links-module-DatabasesModule-676ff766479681d888b7e1fec9cfb772c052e696d2f0c454706033cf8114fc8f1b167788acdff4ce13efaa0e0ea030d6d2f03b164720b1238d925e35bd255762"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DatabasesModule-676ff766479681d888b7e1fec9cfb772c052e696d2f0c454706033cf8114fc8f1b167788acdff4ce13efaa0e0ea030d6d2f03b164720b1238d925e35bd255762"' :
                                        'id="xs-injectables-links-module-DatabasesModule-676ff766479681d888b7e1fec9cfb772c052e696d2f0c454706033cf8114fc8f1b167788acdff4ce13efaa0e0ea030d6d2f03b164720b1238d925e35bd255762"' }>
                                        <li class="link">
                                            <a href="injectables/DatabasesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesModule.html" data-type="entity-link" >FilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FilesModule-3931911a37aacbe06115c3e0ea38c1b1787cb03223472d044d298b6be9673459109cc2abc042deb9e633722a0ab90aa9d6eebac9032b54d4b23beea811c99d8b"' : 'data-bs-target="#xs-controllers-links-module-FilesModule-3931911a37aacbe06115c3e0ea38c1b1787cb03223472d044d298b6be9673459109cc2abc042deb9e633722a0ab90aa9d6eebac9032b54d4b23beea811c99d8b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FilesModule-3931911a37aacbe06115c3e0ea38c1b1787cb03223472d044d298b6be9673459109cc2abc042deb9e633722a0ab90aa9d6eebac9032b54d4b23beea811c99d8b"' :
                                            'id="xs-controllers-links-module-FilesModule-3931911a37aacbe06115c3e0ea38c1b1787cb03223472d044d298b6be9673459109cc2abc042deb9e633722a0ab90aa9d6eebac9032b54d4b23beea811c99d8b"' }>
                                            <li class="link">
                                                <a href="controllers/FilesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FilesModule-3931911a37aacbe06115c3e0ea38c1b1787cb03223472d044d298b6be9673459109cc2abc042deb9e633722a0ab90aa9d6eebac9032b54d4b23beea811c99d8b"' : 'data-bs-target="#xs-injectables-links-module-FilesModule-3931911a37aacbe06115c3e0ea38c1b1787cb03223472d044d298b6be9673459109cc2abc042deb9e633722a0ab90aa9d6eebac9032b54d4b23beea811c99d8b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesModule-3931911a37aacbe06115c3e0ea38c1b1787cb03223472d044d298b6be9673459109cc2abc042deb9e633722a0ab90aa9d6eebac9032b54d4b23beea811c99d8b"' :
                                        'id="xs-injectables-links-module-FilesModule-3931911a37aacbe06115c3e0ea38c1b1787cb03223472d044d298b6be9673459109cc2abc042deb9e633722a0ab90aa9d6eebac9032b54d4b23beea811c99d8b"' }>
                                        <li class="link">
                                            <a href="injectables/FilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HealthModule-f36e1750a0323d8a7d6bca097e0bc20c3e35791b6d788201b37fbaf94d08b8a4f10c6064f64d1a0ae5e97cab5a4f34fa333ad4aa67ac3ceb7a0eef9f0c24a97e"' : 'data-bs-target="#xs-controllers-links-module-HealthModule-f36e1750a0323d8a7d6bca097e0bc20c3e35791b6d788201b37fbaf94d08b8a4f10c6064f64d1a0ae5e97cab5a4f34fa333ad4aa67ac3ceb7a0eef9f0c24a97e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-f36e1750a0323d8a7d6bca097e0bc20c3e35791b6d788201b37fbaf94d08b8a4f10c6064f64d1a0ae5e97cab5a4f34fa333ad4aa67ac3ceb7a0eef9f0c24a97e"' :
                                            'id="xs-controllers-links-module-HealthModule-f36e1750a0323d8a7d6bca097e0bc20c3e35791b6d788201b37fbaf94d08b8a4f10c6064f64d1a0ae5e97cab5a4f34fa333ad4aa67ac3ceb7a0eef9f0c24a97e"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/JobsModule.html" data-type="entity-link" >JobsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-JobsModule-f7cf057d6408efe2735b2107d078fedd69d446f9f6ae7ff4678af4f0e41de65d4ff24aff5ca35cf3d0bb2c15f669ba4efedea16171e0e2bfe2f6cc8999495132"' : 'data-bs-target="#xs-controllers-links-module-JobsModule-f7cf057d6408efe2735b2107d078fedd69d446f9f6ae7ff4678af4f0e41de65d4ff24aff5ca35cf3d0bb2c15f669ba4efedea16171e0e2bfe2f6cc8999495132"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-JobsModule-f7cf057d6408efe2735b2107d078fedd69d446f9f6ae7ff4678af4f0e41de65d4ff24aff5ca35cf3d0bb2c15f669ba4efedea16171e0e2bfe2f6cc8999495132"' :
                                            'id="xs-controllers-links-module-JobsModule-f7cf057d6408efe2735b2107d078fedd69d446f9f6ae7ff4678af4f0e41de65d4ff24aff5ca35cf3d0bb2c15f669ba4efedea16171e0e2bfe2f6cc8999495132"' }>
                                            <li class="link">
                                                <a href="controllers/JobsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-JobsModule-f7cf057d6408efe2735b2107d078fedd69d446f9f6ae7ff4678af4f0e41de65d4ff24aff5ca35cf3d0bb2c15f669ba4efedea16171e0e2bfe2f6cc8999495132"' : 'data-bs-target="#xs-injectables-links-module-JobsModule-f7cf057d6408efe2735b2107d078fedd69d446f9f6ae7ff4678af4f0e41de65d4ff24aff5ca35cf3d0bb2c15f669ba4efedea16171e0e2bfe2f6cc8999495132"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-JobsModule-f7cf057d6408efe2735b2107d078fedd69d446f9f6ae7ff4678af4f0e41de65d4ff24aff5ca35cf3d0bb2c15f669ba4efedea16171e0e2bfe2f6cc8999495132"' :
                                        'id="xs-injectables-links-module-JobsModule-f7cf057d6408efe2735b2107d078fedd69d446f9f6ae7ff4678af4f0e41de65d4ff24aff5ca35cf3d0bb2c15f669ba4efedea16171e0e2bfe2f6cc8999495132"' }>
                                        <li class="link">
                                            <a href="injectables/JobsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MailModule-4dd4dc38acec122d161fde87e26ff09fe6e8dc0476f3b58ea23685d74e820cee0acfa3967e467a6c12ab62af3bd9c31288742fb096c9d84ac0d24520b875f8f4"' : 'data-bs-target="#xs-controllers-links-module-MailModule-4dd4dc38acec122d161fde87e26ff09fe6e8dc0476f3b58ea23685d74e820cee0acfa3967e467a6c12ab62af3bd9c31288742fb096c9d84ac0d24520b875f8f4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MailModule-4dd4dc38acec122d161fde87e26ff09fe6e8dc0476f3b58ea23685d74e820cee0acfa3967e467a6c12ab62af3bd9c31288742fb096c9d84ac0d24520b875f8f4"' :
                                            'id="xs-controllers-links-module-MailModule-4dd4dc38acec122d161fde87e26ff09fe6e8dc0476f3b58ea23685d74e820cee0acfa3967e467a6c12ab62af3bd9c31288742fb096c9d84ac0d24520b875f8f4"' }>
                                            <li class="link">
                                                <a href="controllers/MailController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-4dd4dc38acec122d161fde87e26ff09fe6e8dc0476f3b58ea23685d74e820cee0acfa3967e467a6c12ab62af3bd9c31288742fb096c9d84ac0d24520b875f8f4"' : 'data-bs-target="#xs-injectables-links-module-MailModule-4dd4dc38acec122d161fde87e26ff09fe6e8dc0476f3b58ea23685d74e820cee0acfa3967e467a6c12ab62af3bd9c31288742fb096c9d84ac0d24520b875f8f4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-4dd4dc38acec122d161fde87e26ff09fe6e8dc0476f3b58ea23685d74e820cee0acfa3967e467a6c12ab62af3bd9c31288742fb096c9d84ac0d24520b875f8f4"' :
                                        'id="xs-injectables-links-module-MailModule-4dd4dc38acec122d161fde87e26ff09fe6e8dc0476f3b58ea23685d74e820cee0acfa3967e467a6c12ab62af3bd9c31288742fb096c9d84ac0d24520b875f8f4"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PermissionsModule.html" data-type="entity-link" >PermissionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PermissionsModule-b2115627eca2237f86b55c7fa3557d8094c8a99983856007a4edf15918f546eed1647294abe0d523e784bc7dd3b31f9b511f5c2ab7cf121061424217c55af6d5"' : 'data-bs-target="#xs-controllers-links-module-PermissionsModule-b2115627eca2237f86b55c7fa3557d8094c8a99983856007a4edf15918f546eed1647294abe0d523e784bc7dd3b31f9b511f5c2ab7cf121061424217c55af6d5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PermissionsModule-b2115627eca2237f86b55c7fa3557d8094c8a99983856007a4edf15918f546eed1647294abe0d523e784bc7dd3b31f9b511f5c2ab7cf121061424217c55af6d5"' :
                                            'id="xs-controllers-links-module-PermissionsModule-b2115627eca2237f86b55c7fa3557d8094c8a99983856007a4edf15918f546eed1647294abe0d523e784bc7dd3b31f9b511f5c2ab7cf121061424217c55af6d5"' }>
                                            <li class="link">
                                                <a href="controllers/PermissionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PermissionsModule-b2115627eca2237f86b55c7fa3557d8094c8a99983856007a4edf15918f546eed1647294abe0d523e784bc7dd3b31f9b511f5c2ab7cf121061424217c55af6d5"' : 'data-bs-target="#xs-injectables-links-module-PermissionsModule-b2115627eca2237f86b55c7fa3557d8094c8a99983856007a4edf15918f546eed1647294abe0d523e784bc7dd3b31f9b511f5c2ab7cf121061424217c55af6d5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PermissionsModule-b2115627eca2237f86b55c7fa3557d8094c8a99983856007a4edf15918f546eed1647294abe0d523e784bc7dd3b31f9b511f5c2ab7cf121061424217c55af6d5"' :
                                        'id="xs-injectables-links-module-PermissionsModule-b2115627eca2237f86b55c7fa3557d8094c8a99983856007a4edf15918f546eed1647294abe0d523e784bc7dd3b31f9b511f5c2ab7cf121061424217c55af6d5"' }>
                                        <li class="link">
                                            <a href="injectables/PermissionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResumesModule.html" data-type="entity-link" >ResumesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ResumesModule-eaf7865c7d26c32fee8bc1e2fe78a4b353f63ba91ada5c36bb379dcd6b84d2c0c42a2ffe038a5af6b2edcca1471c332a5f96f369f6ef8d481dbd6c5fcae35ce5"' : 'data-bs-target="#xs-controllers-links-module-ResumesModule-eaf7865c7d26c32fee8bc1e2fe78a4b353f63ba91ada5c36bb379dcd6b84d2c0c42a2ffe038a5af6b2edcca1471c332a5f96f369f6ef8d481dbd6c5fcae35ce5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ResumesModule-eaf7865c7d26c32fee8bc1e2fe78a4b353f63ba91ada5c36bb379dcd6b84d2c0c42a2ffe038a5af6b2edcca1471c332a5f96f369f6ef8d481dbd6c5fcae35ce5"' :
                                            'id="xs-controllers-links-module-ResumesModule-eaf7865c7d26c32fee8bc1e2fe78a4b353f63ba91ada5c36bb379dcd6b84d2c0c42a2ffe038a5af6b2edcca1471c332a5f96f369f6ef8d481dbd6c5fcae35ce5"' }>
                                            <li class="link">
                                                <a href="controllers/ResumesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ResumesModule-eaf7865c7d26c32fee8bc1e2fe78a4b353f63ba91ada5c36bb379dcd6b84d2c0c42a2ffe038a5af6b2edcca1471c332a5f96f369f6ef8d481dbd6c5fcae35ce5"' : 'data-bs-target="#xs-injectables-links-module-ResumesModule-eaf7865c7d26c32fee8bc1e2fe78a4b353f63ba91ada5c36bb379dcd6b84d2c0c42a2ffe038a5af6b2edcca1471c332a5f96f369f6ef8d481dbd6c5fcae35ce5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ResumesModule-eaf7865c7d26c32fee8bc1e2fe78a4b353f63ba91ada5c36bb379dcd6b84d2c0c42a2ffe038a5af6b2edcca1471c332a5f96f369f6ef8d481dbd6c5fcae35ce5"' :
                                        'id="xs-injectables-links-module-ResumesModule-eaf7865c7d26c32fee8bc1e2fe78a4b353f63ba91ada5c36bb379dcd6b84d2c0c42a2ffe038a5af6b2edcca1471c332a5f96f369f6ef8d481dbd6c5fcae35ce5"' }>
                                        <li class="link">
                                            <a href="injectables/ResumesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RolesModule.html" data-type="entity-link" >RolesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RolesModule-be7175c8456ef39703fc6ad8d5ad06dc12f17898a51f223f8cd48feec90149ca7f1f0d264a5d213cff0358805eaa2ddca3f5db2f2d5452fc336c980d9828431c"' : 'data-bs-target="#xs-controllers-links-module-RolesModule-be7175c8456ef39703fc6ad8d5ad06dc12f17898a51f223f8cd48feec90149ca7f1f0d264a5d213cff0358805eaa2ddca3f5db2f2d5452fc336c980d9828431c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RolesModule-be7175c8456ef39703fc6ad8d5ad06dc12f17898a51f223f8cd48feec90149ca7f1f0d264a5d213cff0358805eaa2ddca3f5db2f2d5452fc336c980d9828431c"' :
                                            'id="xs-controllers-links-module-RolesModule-be7175c8456ef39703fc6ad8d5ad06dc12f17898a51f223f8cd48feec90149ca7f1f0d264a5d213cff0358805eaa2ddca3f5db2f2d5452fc336c980d9828431c"' }>
                                            <li class="link">
                                                <a href="controllers/RolesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RolesModule-be7175c8456ef39703fc6ad8d5ad06dc12f17898a51f223f8cd48feec90149ca7f1f0d264a5d213cff0358805eaa2ddca3f5db2f2d5452fc336c980d9828431c"' : 'data-bs-target="#xs-injectables-links-module-RolesModule-be7175c8456ef39703fc6ad8d5ad06dc12f17898a51f223f8cd48feec90149ca7f1f0d264a5d213cff0358805eaa2ddca3f5db2f2d5452fc336c980d9828431c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RolesModule-be7175c8456ef39703fc6ad8d5ad06dc12f17898a51f223f8cd48feec90149ca7f1f0d264a5d213cff0358805eaa2ddca3f5db2f2d5452fc336c980d9828431c"' :
                                        'id="xs-injectables-links-module-RolesModule-be7175c8456ef39703fc6ad8d5ad06dc12f17898a51f223f8cd48feec90149ca7f1f0d264a5d213cff0358805eaa2ddca3f5db2f2d5452fc336c980d9828431c"' }>
                                        <li class="link">
                                            <a href="injectables/RolesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubscribersModule.html" data-type="entity-link" >SubscribersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SubscribersModule-4d60fdc90f91e191a14cac0fedfbafd1ed88b3d669ae40d541336e42a867576f3b8ed37ddf74f1520728846ebc27bfcdeba6df34751b699dc30136c44a204af2"' : 'data-bs-target="#xs-controllers-links-module-SubscribersModule-4d60fdc90f91e191a14cac0fedfbafd1ed88b3d669ae40d541336e42a867576f3b8ed37ddf74f1520728846ebc27bfcdeba6df34751b699dc30136c44a204af2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SubscribersModule-4d60fdc90f91e191a14cac0fedfbafd1ed88b3d669ae40d541336e42a867576f3b8ed37ddf74f1520728846ebc27bfcdeba6df34751b699dc30136c44a204af2"' :
                                            'id="xs-controllers-links-module-SubscribersModule-4d60fdc90f91e191a14cac0fedfbafd1ed88b3d669ae40d541336e42a867576f3b8ed37ddf74f1520728846ebc27bfcdeba6df34751b699dc30136c44a204af2"' }>
                                            <li class="link">
                                                <a href="controllers/SubscribersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SubscribersModule-4d60fdc90f91e191a14cac0fedfbafd1ed88b3d669ae40d541336e42a867576f3b8ed37ddf74f1520728846ebc27bfcdeba6df34751b699dc30136c44a204af2"' : 'data-bs-target="#xs-injectables-links-module-SubscribersModule-4d60fdc90f91e191a14cac0fedfbafd1ed88b3d669ae40d541336e42a867576f3b8ed37ddf74f1520728846ebc27bfcdeba6df34751b699dc30136c44a204af2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SubscribersModule-4d60fdc90f91e191a14cac0fedfbafd1ed88b3d669ae40d541336e42a867576f3b8ed37ddf74f1520728846ebc27bfcdeba6df34751b699dc30136c44a204af2"' :
                                        'id="xs-injectables-links-module-SubscribersModule-4d60fdc90f91e191a14cac0fedfbafd1ed88b3d669ae40d541336e42a867576f3b8ed37ddf74f1520728846ebc27bfcdeba6df34751b699dc30136c44a204af2"' }>
                                        <li class="link">
                                            <a href="injectables/SubscribersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-6fe3c9a4e8e89753d6ea3c402ffa14f794ae6f94fcfa24b83d44dbdb03b25370f5fd634eadb97b9fab900aa57a7a2c2b0d7898d3ee5da0653799a551f81bff9f"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-6fe3c9a4e8e89753d6ea3c402ffa14f794ae6f94fcfa24b83d44dbdb03b25370f5fd634eadb97b9fab900aa57a7a2c2b0d7898d3ee5da0653799a551f81bff9f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-6fe3c9a4e8e89753d6ea3c402ffa14f794ae6f94fcfa24b83d44dbdb03b25370f5fd634eadb97b9fab900aa57a7a2c2b0d7898d3ee5da0653799a551f81bff9f"' :
                                            'id="xs-controllers-links-module-UsersModule-6fe3c9a4e8e89753d6ea3c402ffa14f794ae6f94fcfa24b83d44dbdb03b25370f5fd634eadb97b9fab900aa57a7a2c2b0d7898d3ee5da0653799a551f81bff9f"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-6fe3c9a4e8e89753d6ea3c402ffa14f794ae6f94fcfa24b83d44dbdb03b25370f5fd634eadb97b9fab900aa57a7a2c2b0d7898d3ee5da0653799a551f81bff9f"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-6fe3c9a4e8e89753d6ea3c402ffa14f794ae6f94fcfa24b83d44dbdb03b25370f5fd634eadb97b9fab900aa57a7a2c2b0d7898d3ee5da0653799a551f81bff9f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-6fe3c9a4e8e89753d6ea3c402ffa14f794ae6f94fcfa24b83d44dbdb03b25370f5fd634eadb97b9fab900aa57a7a2c2b0d7898d3ee5da0653799a551f81bff9f"' :
                                        'id="xs-injectables-links-module-UsersModule-6fe3c9a4e8e89753d6ea3c402ffa14f794ae6f94fcfa24b83d44dbdb03b25370f5fd634eadb97b9fab900aa57a7a2c2b0d7898d3ee5da0653799a551f81bff9f"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CompaniesController.html" data-type="entity-link" >CompaniesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DatabasesController.html" data-type="entity-link" >DatabasesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FilesController.html" data-type="entity-link" >FilesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HealthController.html" data-type="entity-link" >HealthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/JobsController.html" data-type="entity-link" >JobsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MailController.html" data-type="entity-link" >MailController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PermissionsController.html" data-type="entity-link" >PermissionsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ResumesController.html" data-type="entity-link" >ResumesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RolesController.html" data-type="entity-link" >RolesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SubscribersController.html" data-type="entity-link" >SubscribersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Company.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company-1.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company-2.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCompanyDto.html" data-type="entity-link" >CreateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFileDto.html" data-type="entity-link" >CreateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateJobDto.html" data-type="entity-link" >CreateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePermissionDto.html" data-type="entity-link" >CreatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateResumeDto.html" data-type="entity-link" >CreateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoleDto.html" data-type="entity-link" >CreateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSubscriberDto.html" data-type="entity-link" >CreateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserCvDto.html" data-type="entity-link" >CreateUserCvDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/File.html" data-type="entity-link" >File</a>
                            </li>
                            <li class="link">
                                <a href="classes/History.html" data-type="entity-link" >History</a>
                            </li>
                            <li class="link">
                                <a href="classes/Job.html" data-type="entity-link" >Job</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUserDto.html" data-type="entity-link" >LoginUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Permission.html" data-type="entity-link" >Permission</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUserDto.html" data-type="entity-link" >RegisterUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Resume.html" data-type="entity-link" >Resume</a>
                            </li>
                            <li class="link">
                                <a href="classes/Role.html" data-type="entity-link" >Role</a>
                            </li>
                            <li class="link">
                                <a href="classes/Subscriber.html" data-type="entity-link" >Subscriber</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCompanyDto.html" data-type="entity-link" >UpdateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatedBy.html" data-type="entity-link" >UpdatedBy</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFileDto.html" data-type="entity-link" >UpdateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateJobDto.html" data-type="entity-link" >UpdateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePermissionDto.html" data-type="entity-link" >UpdatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateResumeDto.html" data-type="entity-link" >UpdateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRoleDto.html" data-type="entity-link" >UpdateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSubscriberDto.html" data-type="entity-link" >UpdateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CompaniesService.html" data-type="entity-link" >CompaniesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DatabasesService.html" data-type="entity-link" >DatabasesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilesService.html" data-type="entity-link" >FilesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JobsService.html" data-type="entity-link" >JobsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailService.html" data-type="entity-link" >MailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MulterConfigService.html" data-type="entity-link" >MulterConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PermissionsService.html" data-type="entity-link" >PermissionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResumesService.html" data-type="entity-link" >ResumesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RolesService.html" data-type="entity-link" >RolesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubscribersService.html" data-type="entity-link" >SubscribersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransformInterceptor.html" data-type="entity-link" >TransformInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});