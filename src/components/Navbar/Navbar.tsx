import { forwardRef, useState, useCallback } from 'react';
import './Navbar.css';

function LogoSVG() {
    return (
        <svg viewBox="0 0 300 300" width="58" height="58" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
                <clipPath id="nav-clip-1">
                    <rect x="0" y="0" transform="scale(0.14648,0.14648)" width="2048" height="2048" fill="none" />
                </clipPath>
                <linearGradient x1="120.01802" y1="249.28125" x2="123.30293" y2="141.40854" gradientUnits="userSpaceOnUse" id="nav-color-1">
                    <stop offset="0" stopColor="#002c33" />
                    <stop offset="1" stopColor="#47ae5d" />
                </linearGradient>
                <linearGradient x1="207.53467" y1="248.74512" x2="204.07471" y2="144.04307" gradientUnits="userSpaceOnUse" id="nav-color-2">
                    <stop offset="0" stopColor="#002c33" />
                    <stop offset="1" stopColor="#45ac5d" />
                </linearGradient>
                <linearGradient x1="155.41992" y1="34.64604" x2="164.51367" y2="158.38916" gradientUnits="userSpaceOnUse" id="nav-color-3">
                    <stop offset="0" stopColor="#96cc3d" />
                    <stop offset="1" stopColor="#52a953" />
                </linearGradient>
            </defs>
            <g clipPath="url(#nav-clip-1)" fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" style={{ mixBlendMode: 'normal' }}>
                <path d="M87.28843,140.81279c0.62944,-0.65508 3.65068,-2.26157 4.59463,-2.74614c8.85952,-4.62598 18.6564,-7.17275 28.64707,-7.44727c12.9668,-0.25327 25.12075,2.45391 36.20229,9.31685c1.48389,0.91934 5.27637,3.37148 6.33838,4.63257c0.89355,0.62827 2.29395,1.93755 3.12158,2.74175c6.00439,5.8374 10.71973,13.38135 12.8335,21.51123c0.28418,1.09277 0.17578,5.59131 0.17432,7.04297l-0.01611,13.3125l0.07764,59.50781c-4.58936,-0.12305 -9.42773,-0.04248 -14.04785,-0.04248l-24.84272,0.00586c-0.11133,-3.92139 -1.61499,-7.87207 -4.01602,-10.96143c-3.12524,-3.97559 -7.70728,-6.54053 -12.73008,-7.125c-6.8231,-0.84668 -13.88687,2.37451 -17.73076,8.05664c-2.04243,3.01904 -2.88413,5.79785 -3.29897,9.37354l-39.41689,-0.00586c-0.26938,-6.04102 0.62095,-12.07617 2.6231,-17.78174c9.48179,-27.25049 41.22437,-45.21387 69.4689,-37.67871c1.80747,0.48193 3.53745,1.09131 5.30229,1.70947c-0.15146,-5.66748 -1.36582,-10.4209 -4.74595,-15.03076c-6.01245,-8.2002 -16.97607,-9.90234 -24.98042,-3.52441c-3.78926,3.01904 -7.14053,7.94824 -7.76968,12.83203c-1.67563,0.11279 -4.15137,0.04248 -5.87153,0.04395l-10.43247,0.00146c-7.65688,0.00146 -16.15283,0.18604 -23.75171,-0.04395c-0.15923,-2.63232 0.08071,-5.6748 0.18296,-8.33057c0.53525,-13.9043 7.9043,-26.88428 18.64673,-35.51323c1.69673,-1.36289 3.5335,-2.80605 5.43779,-3.85708z" fill="url(#nav-color-1)" />
                <path d="M185.72754,151.95557c-0.14355,-1.91162 -0.00732,-3.96973 -0.0791,-5.88721c-0.0835,-2.26436 0.11133,-3.79629 1.53223,-5.63877c2.82568,-3.6646 6.25928,-3.23936 10.31543,-3.24155l9.71338,0.00264l8.18555,-0.01348c1.16455,-0.00161 3.73096,-0.15469 4.78418,0.09141c3.36328,0.78472 5.50342,4.63008 5.80078,7.60049c0.30029,1.13174 0.18604,6.84917 0.18604,8.30083l-0.00879,17.38037l0.01172,77.92236l-40.52344,-0.01318c0.24609,-7.95264 0.04248,-16.91895 0.04248,-24.93164l0.01318,-46.11914l-0.01465,-17.57812c-0.00146,-1.34473 -0.10693,-6.75879 0.04102,-7.875z" fill="url(#nav-color-2)" />
                <path d="M148.78271,35.08345l17.69092,0.00586c1.7666,-0.00454 7.40625,-0.12349 8.89893,0.16772c0.81299,0.15205 1.56299,0.54155 2.15332,1.11929c1.97754,1.96772 1.7915,9.63091 1.80029,12.42246c0.01318,3.38862 -0.02051,6.95815 -0.02197,10.3623l0.00146,28.85127l0.00146,45.18472c-0.00146,8.24707 0.11426,16.81758 -0.0498,25.04414c-1.02393,-1.80176 -1.88818,-3.27979 -3.01172,-5.02734c-9.04687,-13.31982 -21.57715,-21.03252 -37.04707,-24.83276l-0.01348,-59.32251l-0.0022,-18.81504c-0.00161,-3.18809 -0.07163,-6.38247 0.05332,-9.56689c0.21563,-5.49492 5.4394,-5.49302 9.54653,-5.59321z" fill="url(#nav-color-3)" />
            </g>
        </svg>
    );
}

const NAV_LINKS: { href: string; id: string; label: string; isCta?: boolean }[] = [
    { href: '#casestudies', id: 'casestudies', label: 'Work' },
    { href: '#industries', id: 'industries', label: 'Industries' },
    { href: '#howitworks', id: 'howitworks', label: 'Process' },
    { href: '#contact', id: 'contact', label: 'Contact', isCta: true },
];

const Navbar = forwardRef<HTMLDivElement>((_, ref) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        setMenuOpen(false);
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <div className="topbar" ref={ref}>
            <div className="logo-stamp">
                <div className="logo-icon">
                    <LogoSVG />
                </div>
                <div className="logo-text-group">
                    <div className="logo-mark">DareX</div>
                    <div className="logo-sub">AI Automation Infrastructure</div>
                </div>
            </div>

            <button
                type="button"
                className={`nav-toggle ${menuOpen ? 'is-open' : ''}`}
                aria-expanded={menuOpen}
                aria-controls="primary-navigation"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setMenuOpen((open) => !open)}
            >
                <span />
                <span />
                <span />
            </button>

            <nav className={`nav ${menuOpen ? 'nav-open' : ''}`} id="primary-navigation" aria-label="Primary">
                {NAV_LINKS.map(({ href, id, label, isCta }) => (
                    <a
                        key={id}
                        href={href}
                        className={isCta ? 'nav-cta' : undefined}
                        aria-label={isCta ? 'Contact Darex AI' : `Go to ${label}`}
                        onClick={(e) => handleScroll(e, id)}
                    >
                        {label.toUpperCase()}
                    </a>
                ))}
            </nav>
        </div>
    );
});

Navbar.displayName = 'Navbar';

export default Navbar;
