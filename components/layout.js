import Head from "next/head"
import Footer from "./footer";
import Header from "./header";

export default function Layout(props) {
    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Josefin+Sans:300,300i,400,400i,700,700i" rel="stylesheet" />
            </Head>
            <Header />

            {props.children}

            <Footer />
            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        </>
    )
}
