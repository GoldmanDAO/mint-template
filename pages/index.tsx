import CountDown from '../components/CountDown';
import Layout from '../components/Layout'
import MintModule from '../components/Mint/MintModule';

const mintStartTime = 0 * 1000; // Milliseconds

const IndexPage = () => {
    return (
        <>
            <Layout title="Mint Page">
                <div className="hero h-full">
                    <div className="flex flex-col gap-2 w-4/5 md:w-1/3 md:max-w-screen-sm">
                        {mintStartTime > Date.now() ? (
                            <CountDown endTime={mintStartTime} />
                        ) : (
                            <MintModule />
                        )
                        }
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default IndexPage
