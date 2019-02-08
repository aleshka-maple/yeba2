import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {createStore} from 'redux';
import {Route} from 'react-router';

const store = createStore(() => {});

class Index extends React.Component {

    render () {
        return (
            <section>
                I`m alive
                {/** Other routes? */}
            </section>
        )
    }
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/" component={Index}/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('yeba2')
);
