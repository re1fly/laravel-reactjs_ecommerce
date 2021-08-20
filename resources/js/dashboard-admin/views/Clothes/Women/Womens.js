import React, {Component} from 'react';
import {Container} from "react-bootstrap";
import ListWomens from "./ListWomens";
import {GET_WOMEN_NEW_ARRIVALS} from "../../../components/Api/Url";

import OwlCarousel from "react-owl-carousel";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default class Womens extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newArrivals: []
        }
    }

    componentDidMount() {
        axios.get(GET_WOMEN_NEW_ARRIVALS).then(response => {
            if (response.data.success === true) {
                this.setState(
                    {newArrivals: response.data.new_arrivals}
                )
            }
        })

        setTimeout(function () {
            this.setState({render: true})
        }.bind(this), 1000)
    }


    render() {
        const {newArrivals} = this.state;
        return (
            <>
                <Container fluid>
                    <div className="text-center">
                        <div className="animate four">
                            <span>N</span><span>e</span><span>w</span>&nbsp;
                            <span>A</span><span>r</span><span>r</span><span>i</span><span>v</span>
                            <span>a</span><span>l</span><span>s</span>
                        </div>
                    </div>
                    <OwlCarousel items={2}
                                 loop="true"
                                 enter="true"
                                 margin={20}
                                 dots="true"
                                 autoplay="true"
                                 autoplayTimeout={2000}
                    >
                        {newArrivals.map((itemArrive) => (
                            <div className="item" key={itemArrive.id}>
                                <img alt={itemArrive.product_name}
                                     src={itemArrive.product_image}/>
                            </div>
                        ))
                        }
                    </OwlCarousel>
                    <ListWomens/>
                </Container>
            </>
        )
    }
}
