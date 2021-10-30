
interface FooterProps {
    footer: string;
}

const Footer: React.FC<FooterProps> = (props) => {
    return (
        <footer>
            <div>{props.footer}</div>
        </footer>
    )
}

export default Footer;
