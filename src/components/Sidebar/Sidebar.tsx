const WIRE_VIEW_WIDTH = 40;
const WIRE_VIEW_HEIGHT = 375;

const CORD_PATH = `
  M 20 0
  C 27 3, 27 7, 20 10
  S 13 13, 20 20
  S 27 27, 20 30
  S 13 33, 20 40
  S 27 47, 20 50
  S 13 53, 20 60
  S 27 67, 20 70
  S 13 73, 20 80
  S 27 87, 20 90
  S 13 93, 20 100
  S 27 107, 20 110
  S 13 113, 20 120
  S 27 127, 20 130
  S 13 133, 20 140
  S 27 147, 20 150
  S 13 153, 20 160
  S 27 167, 20 170
  S 13 177, 20 182
  S 27 197, 20 200
  S 13 203, 20 210
  S 27 217, 20 220
  S 13 223, 20 230
  S 27 227, 20 232
  S 13 237, 20 240
  S 27 247, 20 250
  S 13 253, 20 260
  S 27 267, 20 270
  S 13 273, 20 280
  S 27 287, 20 290
  S 13 293, 20 300
  S 27 307, 20 310
  S 13 313, 20 320
  S 27 327, 20 330
  S 13 333, 20 340
  S 27 347, 20 350
  S 13 353, 20 357
  L 20 ${WIRE_VIEW_HEIGHT}
`;

const CORD_LAYERS = [
    'sidebar__svg-path',
    'sidebar__svg-path2',
] as const;

type SidebarProps = {
    onBoom?: () => void;
};

export function Sidebar({onBoom}: SidebarProps) {
    return (
        <div className="sidebar">
            <div className="sidebar__wrapper">
                <svg
                    className="sidebar__svg"
                    viewBox={`0 0 ${WIRE_VIEW_WIDTH} ${WIRE_VIEW_HEIGHT}`}
                    aria-hidden="true"
                >
                    {CORD_LAYERS.map((className) => (
                        <path key={className} className={className} d={CORD_PATH}/>
                    ))}
                </svg>
                <div className="sidebar__controller">
                    <nav className="sidebar__nav" aria-label="Разделы страницы">
                        <a href="#about" className="sidebar__controller-button">обо мне</a>
                        <a href="#stack" className="sidebar__controller-button">стэк</a>
                        <a href="#framework" className="sidebar__controller-button">проекты</a>
                        <a href="#contacts" className="sidebar__controller-button">контакты</a>
                    </nav>
                    <button
                        type="button"
                        className="sidebar__controller-boombutton"
                        aria-label="Взорвать билборд"
                        onClick={onBoom}
                    />
                </div>
            </div>
        </div>
    )
}
