import React, { Component } from 'react';
import ReactDOM from 'react-dom';


//the navbar for the page
let Navbar = props => {
    return (
        <div className="navbar-fixed">
            <nav>
                <div className="nav-wrapper">
                    <a href="#!" className="left">MegaClick</a>
                    <ul className='brand-logo'>
                        <li>{props.status ? 'Congrats, you did it...' : "If you win, I'll let you know"}</li>
                    </ul>
                    <ul className="right">
                        <li className='btn '>Score:{props.score} </li>
                        <li className='btn'>Top Score:{props.topscore} </li>
                    </ul>
                </div>
            </nav>
        </div>

    )
}


//create cards 
let Card = props => {
    return (
        <div className='flexitem' >
            <div>
                <div className='card-image'>
                    <img className='circle hoverable' src={props.img} alt='flameguy' style={{ height: 150, width: 150 }}
                        onClick={props.random}
                    ></img>
                </div>
            </div>
        </div>
    )
}



//create a game class
class Game extends Component {

    state = {
        characters: [{ img: 'https://art.pixilart.com/thumb/8d261193477eaf2.png', count: 0 }, { img: 'https://art.pixilart.com/bee6ceb3b712870.png', count: 0 }, { img: 'https://art.pixilart.com/a9171a195faada0.png', count: 0 }, { img: 'https://art.pixilart.com/073bd904f7c8f0b.png', count: 0 }, { img: 'https://art.pixilart.com/298c6f57a8016c3.png', count: 0 }, { img: 'https://art.pixilart.com/d6e891178f21509.png', count: 0 }, { img: 'https://art.pixilart.com/e30d34ce6d6993d.png', count: 0 }, { img: 'https://art.pixilart.com/b86c996524f9393.png', count: 0 }, { img: 'https://art.pixilart.com/3099617d885b900.png', count: 0 }],
        score: 0,
        topscore: 0,
        winner: false
    }


    generateCharacters() {
        return this.state.characters.map((character, index) => {
            return <Card img={character.img} key={index} data_key={character.img} random={() => this.search(character.img, this.state.characters)} />
        })
    }

    //randomize the array after clicking an img
    randomize() {
        const arr = this.state.characters
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i)
            const temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
        this.setState({ characters: arr })
    }
    
    winning() {
        this.setState({winner: true})
        
    }
    //search for the character that was clicked and update click count
    search(nameKey, myArray) {
        let highScore = this.state.topscore

        for (var i = 0; i < myArray.length; i++) {

            if (myArray[i].img === nameKey) {

                myArray[i].count = ++myArray[i].count

                //if the character hs been clicked more than once, reset the game
                if (myArray[i].count > 1) {
                    this.reset()
                }
                else {
                    let newScore = this.state.score

                    this.setState({ characters: myArray, score: ++newScore })
                    //change high score 
                    if (newScore > highScore || newScore === highScore) {
                        this.setState({ topscore: newScore })
                        if (newScore === this.state.characters.length) {
                            this.winning()
                        }
                    }
                    this.randomize()
                }
                return
            }
        }
    }

    reset() {
        this.setState({ characters: [{ img: 'https://art.pixilart.com/thumb/8d261193477eaf2.png', count: 0 }, { img: 'https://art.pixilart.com/bee6ceb3b712870.png', count: 0 }, { img: 'https://art.pixilart.com/a9171a195faada0.png', count: 0 }, { img: 'https://art.pixilart.com/073bd904f7c8f0b.png', count: 0 }, { img: 'https://art.pixilart.com/298c6f57a8016c3.png', count: 0 }, { img: 'https://art.pixilart.com/d6e891178f21509.png', count: 0 }, { img: 'https://art.pixilart.com/e30d34ce6d6993d.png', count: 0 }, { img: 'https://art.pixilart.com/b86c996524f9393.png', count: 0 }, { img: 'https://art.pixilart.com/3099617d885b900.png', count: 0 }], score: 0 })
    }

    render() {
        return (
            <div>
                <Navbar score={this.state.score} topscore={this.state.topscore} status={this.state.winner}/>
                <div className='flex-container container' style={{ display: 'flex', flexWrap: 'wrap', width: 465 }}>
                    {this.generateCharacters()}
                </div>
            </div>
        )
    }
}


ReactDOM.render(<Game />, document.getElementById('root'));

