import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {createStore} from 'redux';
import {Route, Switch} from 'react-router';
import {ROUTER} from "./Router";
import {Chat} from 'modules/chat/Chat';
import {Main} from "./modules/main/Main";

const store = createStore(() => {});

class Index extends React.Component {

    render () {
        return (
            <section>
                I`m just a container, you will always see me
                <Switch>
                    <Route exact path={ROUTER.MAIN.path} component={Main} />
                    <Route exact path={ROUTER.CHAT.path} component={Chat} />
                    <Route component={() => <div>a nuka nahui!</div>}/>
                </Switch>
            </section>
        )
    }
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Index />
        </BrowserRouter>
    </Provider>,
    document.getElementById('yeba2')
);
