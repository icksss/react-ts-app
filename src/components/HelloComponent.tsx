interface HelloComponentProps {
    name : string;
}

function HelloComponent({name} : HelloComponentProps) {
    return (
        <div>
            <h1>Hello World {name}</h1>
        </div>
    )
}

export default HelloComponent;
