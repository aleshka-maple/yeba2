import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Link} from 'react-router-dom';
import {Route, Switch} from 'react-router';
import {ROUTER} from "./Router";
import {Chat} from 'modules/chat/Chat';
import {Main} from "./modules/main/Main";
import {store} from "./store/reduxStore";
import './index.less';

interface IProps {
    location: {
        pathname: string;
    }
}

class Index extends React.Component<IProps> {

    isActive (pathname): boolean {
        return this.props.location.pathname === pathname;
    }

    render () {
        return (
            <section className="index-home">
                <nav className="index-home-nav">
                    <Link to={ROUTER.MAIN.path} className={this.isActive(ROUTER.MAIN.path) ? 'active' : ''}>MAIN</Link>
                    <Link to={ROUTER.CHAT.path} className={this.isActive(ROUTER.CHAT.path) ? 'active' : ''}>CHAT</Link>
                </nav>
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
            <Route component={(props) => <Index {...props}/>}/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('yeba2')
);
