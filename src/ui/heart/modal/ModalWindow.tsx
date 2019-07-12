import * as React from "react";
import * as ReactDOM from 'react-dom';
import './ModalWindow.less';

const bodyModalIsOpenClassName = 'body-modal-is-open';

interface IProps {
    onClose: () => void;
    header: JSX.Element;
    body: JSX.Element;
    footer?: JSX.Element;
    className?: string;
    style?: React.CSSProperties;
    getRef?: (instance) => void;
}

export class ModalWindow extends React.Component<IProps> {

    componentDidMount () {
        document.body.classList.add(bodyModalIsOpenClassName)
    }

    componentWillUnmount () {
        document.body.classList.remove(bodyModalIsOpenClassName)
    }

    handleClose = () => {
        this.props.onClose();
    };

    renderModal = () => {
        return (
            <div className="modal-container">
                <div className={`modal-window ${this.props.className || ''}`} ref={this.props.getRef}>
                    <div className="modal-window-content">
                        <div className="modal-header">
                            {this.props.header}
                        </div>
                        <div className="modal-body">
                            {this.props.body}
                        </div>
                        <div className="modal-footer">
                            {this.props.footer}
                        </div>
                    </div>
                    <button className="modal-window-btn-close" onClick={this.handleClose}>Close</button>
                </div>
            </div>
        )
    };

    render () {
        return ReactDOM.createPortal(this.renderModal(), document.getElementById('portal'));
    }
}
