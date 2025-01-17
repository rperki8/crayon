import { route } from './route'
import crayon from 'crayon'
import { MockDocument, MockWindow } from 'crayon/tests/mocks'
import { defaults } from './defaults';
import { routes } from './routes';


// going to anywhere from source
// coming from anywhere to source
fit('Should give the enter animation', (done) => {
    const window = new MockWindow() as any
    const document = new MockDocument() as any
    const app = crayon.create('test-router', window ,document)

    // app.use(routes([
    //     { from: '/**', to:   '/a', name: 'enter' },
    //     { to:   '/**', from: '/a', name: 'exit'  },
    // ]))

    app.path('/a',
        route([
            { from: '/**', to:   '/a', name: 'enter' },
            { to:   '/**', from: '/a', name: 'exit'  },
        ]),
        (req, res) => {
            console.log(res.ctx.animation)
        }
    )

    app.path('/b', 
        (req, res) => {
            console.log(res.ctx.animation)
            done()
        }
    )

    app.load()

    setTimeout(() => app.navigate('/a'))
    setTimeout(() => app.navigate('/b'), 20)

})
