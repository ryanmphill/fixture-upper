import {CopyToClipboard} from 'react-copy-to-clipboard';

export const ConvertedData = ({ JSONData, copyState, setCopyState }) => {
    return <>
        <section className="fixture_upper__codeSection">
            <CopyToClipboard text={JSONData}
                onCopy={() => setCopyState({ ...copyState, copied: true })}>
                <button>Copy to clipboard 📋</button>
            </CopyToClipboard>
            {copyState?.copied ? <div id="copyMessage">Copied.</div> : <></>}
            <pre className="codeBlock">
                <code>
                    {JSONData}
                </code>
            </pre>
        </section>
    </>
}