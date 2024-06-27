import {Outlet} from "react-router-dom";

function Master() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Master;