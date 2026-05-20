import svgPaths from "./svg-nz9zigw29y";

function Left() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Left">
      <p className="font-['Roboto:Light',sans-serif] font-light leading-[normal] relative shrink-0 text-[#3f3f3f] text-[20px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Segmentation
      </p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="content-stretch flex h-[32px] items-center justify-center overflow-clip px-[4px] relative shrink-0" data-name="Open Preview">
        <div className="relative shrink-0 size-[24px]" data-name="dropdown-arrow-down/24">
          <div className="absolute inset-[40.17%_26.42%_33.33%_26.42%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.32 6.36">
              <path d={svgPaths.p2c8c4980} fill="var(--fill-0, #3F3F3F)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <Left />
    </div>
  );
}

function Top() {
  return (
    <div className="content-stretch flex gap-[10px] items-start relative shrink-0" data-name="Top">
      <Frame2 />
      <div className="content-stretch flex h-[32px] items-center justify-center overflow-clip px-[4px] relative shrink-0 w-[24px]" data-name="Open Preview" />
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Header">
      <Top />
    </div>
  );
}

function PanelTitleBar() {
  return (
    <div className="col-[1/span_5] content-stretch flex gap-[393px] items-center justify-self-stretch relative row-1 self-start shrink-0" data-name="Panel title bar">
      <Header />
    </div>
  );
}

function Label() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Label">
      <p className="col-1 font-['Roboto:Regular',sans-serif] font-normal leading-[normal] ml-0 mt-0 relative row-1 text-[#3f3f3f] text-[12px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>{`Assigned Segments & Profiles`}</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0 w-full">
      <div className="content-stretch flex items-start pr-[160px] relative shrink-0" data-name="WF hi-fi - Add segments ...">
        <div className="content-stretch flex flex-col gap-[6px] items-start overflow-clip relative shrink-0" data-name="Text Field">
          <Label />
        </div>
      </div>
    </div>
  );
}

function Typography() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative" data-name="Typography">
      <p className="flex-[1_0_0] font-['Roboto:Italic',sans-serif] font-normal italic leading-[normal] min-w-px relative text-[#868686] text-[15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Search here to add segments to customize your audience for this variant ...
      </p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[6px] items-center min-w-px relative" data-name="Container">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon Left">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector" />
        </svg>
        <div className="absolute inset-[12.5%_14.63%_14.63%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.49 17.49">
            <path d={svgPaths.p3b681e80} fill="var(--fill-0, #3F3F3F)" id="Vector" />
          </svg>
        </div>
      </div>
      <Typography />
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border-2 border-[#006cae] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[6px] items-center px-[9px] py-[6px] relative size-full">
          <Container />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Input />
    </div>
  );
}

function Frame3() {
  return (
    <div className="col-[1/span_6] content-stretch flex flex-col gap-[8px] items-start justify-self-stretch relative row-2 self-start shrink-0">
      <Frame />
      <Frame1 />
    </div>
  );
}

export default function WfHiFiPanelSegmentationEmpty() {
  return (
    <div className="bg-white gap-x-[20px] gap-y-[20px] grid grid-cols-[repeat(6,minmax(0,1fr))] grid-rows-[repeat(2,fit-content(100%))] overflow-clip px-[24px] py-[21px] relative rounded-[8px] size-full" data-name="WF hi-fi - Panel - Segmentation - Empty">
      <PanelTitleBar />
      <Frame3 />
    </div>
  );
}