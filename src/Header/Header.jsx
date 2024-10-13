import icecream from '../assets/ice-cream.svg'
//import ice from './ice-cream.svg'
import './Header.css'

function Header() {

    return (
        <>
            <header>
                <div class="header-logo">
                    <img src={icecream} alt="Lodgo"/>
                </div>
                <div class="texts">
                    <p class="text-1">Dealers</p>
                    <p class="text-2">Info</p>
                </div>
            </header>
        </>
    )

}

export default Header;