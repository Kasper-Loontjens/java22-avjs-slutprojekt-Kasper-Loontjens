export default function CardLibrary({user}){

    const listItems = user.cards.map(c =>
        {if(c.bought > 0)
        return (
        <div className="aProduct" key={c.name}>
            <img index={c.i} src={c.imgUrl} alt="card" />
            <p >{c.name} {c.bought}x</p>
        </div>
        )
        }
    )

    return(
        <div className="libDiv">
            {listItems}
        </div>
    )
}