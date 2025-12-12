import svgPaths from "./svg-6rrla84033";
import { imgVector } from "./svg-tira6";

function Group() {
  return (
    <div className="absolute contents inset-[8.33%]" data-name="Group">
      <div className="absolute bottom-[8.33%] left-1/4 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.5px_-1.167px] mask-size-[14px_14px] right-1/4 top-[8.33%]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-5%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 13">
            <path d={svgPaths.p3135c300} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[8.33%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.167px_-7px] mask-size-[14px_14px] right-3/4 top-1/2" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-10%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 7">
            <path d={svgPaths.p179041c0} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-3/4 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-10.5px_-5.25px] mask-size-[14px_14px] right-[8.33%] top-[37.5%]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-7.69%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 9">
            <path d={svgPaths.p39ba4ec0} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[41.67%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.833px_-3.5px] mask-size-[14px_14px] right-[41.67%] top-1/4" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-0.58px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
            <path d="M0.583335 0.583335H2.91667" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_41.67%_58.33%_41.67%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.833px] mask-size-[14px_14px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-0.58px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
            <path d="M0.583335 0.583335H2.91667" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[58.33%_41.67%_41.67%_41.67%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.833px_-8.167px] mask-size-[14px_14px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-0.58px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
            <path d="M0.583335 0.583335H2.91667" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[41.67%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.833px_-10.5px] mask-size-[14px_14px] right-[41.67%] top-3/4" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-0.58px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
            <path d="M0.583335 0.583335H2.91667" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group />
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <ClipPathGroup />
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[14px]">
        <Icon />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-[37.5px] not-italic text-[12.25px] text-center text-neutral-950 text-nowrap top-0 tracking-[-0.0358px] translate-x-[-50%] whitespace-pre">All Branches</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-[36.7px] not-italic text-[#717182] text-[10.5px] text-center top-0 tracking-[0.1846px] translate-x-[-50%] w-[59px]">3 Branches</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="basis-0 grow h-[31.5px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[31.5px] items-start relative w-full">
        <Container1 />
        <Container2 />
      </div>
    </div>
  );
}

function AdminSidebar() {
  return (
    <div className="absolute content-stretch flex gap-[7px] h-[31.5px] items-center left-[11.5px] top-[5.25px] w-[94.313px]" data-name="AdminSidebar">
      <Container />
      <Container3 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[169.5px] size-[14px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M3.5 5.25L7 8.75L10.5 5.25" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(0,0,0,0)] h-[42px] relative rounded-[6.75px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
      <AdminSidebar />
      <Icon1 />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[71px] items-start left-0 pb-px pt-[14px] px-[14px] top-0 w-[223px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-neutral-200 border-solid inset-0 pointer-events-none" />
      <Button />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[10.5px] size-[14px] top-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p16dcb0} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p29a9aa00} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p9f2bd80} id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p13c0200} id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function AdminSidebar1() {
  return (
    <div className="absolute h-[17.5px] left-[35px] top-[8.75px] w-[163.5px]" data-name="AdminSidebar">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[12.25px] text-neutral-950 text-nowrap top-0 tracking-[-0.0358px] whitespace-pre">Dashboard</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-neutral-100 h-[35px] relative rounded-[6.75px] shrink-0 w-full" data-name="Button">
      <Icon2 />
      <AdminSidebar1 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[10.5px] size-[14px] top-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M4.66667 1.16667V3.5" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M9.33333 1.16667V3.5" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p24a2b500} id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M1.75 5.83333H12.25" id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function AdminSidebar2() {
  return (
    <div className="absolute h-[17.5px] left-[35px] top-[8.75px] w-[163.5px]" data-name="AdminSidebar">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[12.25px] text-neutral-950 text-nowrap top-0 tracking-[-0.0358px] whitespace-pre">Booking</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[35px] relative rounded-[6.75px] shrink-0 w-full" data-name="Button">
      <Icon3 />
      <AdminSidebar2 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[10.5px] size-[14px] top-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p8832196} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M10.5 9.91667V5.25" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M7.58333 9.91667V2.91667" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.66667 9.91667V8.16667" id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function AdminSidebar3() {
  return (
    <div className="absolute h-[17.5px] left-[35px] top-[8.75px] w-[163.5px]" data-name="AdminSidebar">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[12.25px] text-neutral-950 text-nowrap top-0 tracking-[-0.0358px] whitespace-pre">Analytics</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[35px] relative rounded-[6.75px] shrink-0 w-full" data-name="Button">
      <Icon4 />
      <AdminSidebar3 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[10.5px] size-[14px] top-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M7 1.16667V12.8333" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p231c2b00} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function AdminSidebar4() {
  return (
    <div className="absolute h-[17.5px] left-[35px] top-[8.75px] w-[163.5px]" data-name="AdminSidebar">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[12.25px] text-neutral-950 text-nowrap top-0 tracking-[-0.0358px] whitespace-pre">Revenue</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="h-[35px] relative rounded-[6.75px] shrink-0 w-full" data-name="Button">
      <Icon5 />
      <AdminSidebar4 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[10.5px] size-[14px] top-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p317fdd80} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.pba21d00} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p3625bb80} id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p31c78b80} id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function AdminSidebar5() {
  return (
    <div className="absolute h-[17.5px] left-[35px] top-[8.75px] w-[163.5px]" data-name="AdminSidebar">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[12.25px] text-neutral-950 text-nowrap top-0 tracking-[-0.0358px] whitespace-pre">Employees</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[35px] relative rounded-[6.75px] shrink-0 w-full" data-name="Button">
      <Icon6 />
      <AdminSidebar5 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute left-[10.5px] size-[14px] top-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p6932200} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function AdminSidebar6() {
  return (
    <div className="absolute h-[17.5px] left-[35px] top-[8.75px] w-[163.5px]" data-name="AdminSidebar">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[12.25px] text-neutral-950 text-nowrap top-0 tracking-[-0.0358px] whitespace-pre">{`Reviews & Feedback`}</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[35px] relative rounded-[6.75px] shrink-0 w-full" data-name="Button">
      <Icon7 />
      <AdminSidebar6 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute left-[10.5px] size-[14px] top-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.pba95d80} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p172bc380} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.66667 3.5V8.16667" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function AdminSidebar7() {
  return (
    <div className="absolute h-[17.5px] left-[35px] top-[8.75px] w-[163.5px]" data-name="AdminSidebar">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[12.25px] text-neutral-950 text-nowrap top-0 tracking-[-0.0358px] whitespace-pre">Campaign Management</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="h-[35px] relative rounded-[6.75px] shrink-0 w-full" data-name="Button">
      <Icon8 />
      <AdminSidebar7 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[3.5px] h-[983.5px] items-start left-0 pb-0 pt-[7px] px-[7px] top-[71px] w-[223px]" data-name="Container">
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
      <Button6 />
      <Button7 />
    </div>
  );
}

function Text() {
  return (
    <div className="h-[14px] relative shrink-0 w-[12.719px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[12.719px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-[6.5px] not-italic text-[10.5px] text-center text-neutral-950 text-nowrap top-0 tracking-[0.1846px] translate-x-[-50%] whitespace-pre">JS</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[#ececf0] relative rounded-[3.35544e+07px] shrink-0 size-[28px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[28px]">
        <Text />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-[62.52px] not-italic text-[12.25px] text-center text-neutral-950 text-nowrap top-0 tracking-[-0.0358px] translate-x-[-50%] whitespace-pre">John Smith</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute capitalize font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-[62.27px] not-italic text-[10.5px] text-[rgba(10,10,10,0.7)] text-center text-nowrap top-0 tracking-[0.1846px] translate-x-[-50%] whitespace-pre">carwash owner</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="basis-0 grow h-[31.5px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[31.5px] items-start relative w-full">
        <Paragraph />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M3.5 5.25L7 8.75L10.5 5.25" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function AdminSidebar8() {
  return (
    <div className="absolute content-stretch flex gap-[10.5px] h-[31.5px] items-center left-[10.5px] top-[10.5px] w-[188px]" data-name="AdminSidebar">
      <Container6 />
      <Container7 />
      <Icon9 />
    </div>
  );
}

function SlotClone() {
  return (
    <div className="bg-neutral-100 h-[52.5px] relative rounded-[8.75px] shrink-0 w-full" data-name="SlotClone">
      <AdminSidebar8 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[61.5px] items-start left-0 pb-0 pt-[9px] px-[7px] top-[1054.5px] w-[223px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-neutral-200 border-solid inset-0 pointer-events-none" />
      <SlotClone />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M8.75 10.5L5.25 7L8.75 3.5" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-[212.5px] p-px rounded-[3.35544e+07px] size-[21px] top-[21px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[3.35544e+07px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon10 />
    </div>
  );
}

function AdminSidebar9() {
  return (
    <div className="absolute bg-neutral-50 border-[0px_1px_0px_0px] border-neutral-200 border-solid h-[1116px] left-0 top-0 w-[224px]" data-name="AdminSidebar">
      <Container4 />
      <Container5 />
      <Container8 />
      <Button8 />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[21px] text-neutral-950 text-nowrap top-0 tracking-[-0.3589px] whitespace-pre">Dashboard</p>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white h-[57px] relative shrink-0 w-[1907px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[57px] items-start pb-px pl-[21px] pr-[1780.67px] pt-[14px] relative w-[1907px]">
        <Heading />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[31.5px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[31.5px] left-0 not-italic text-[26.25px] text-neutral-950 top-px tracking-[0.2355px] w-[362px]">Welcome back, AutoWash Pro</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Manage your carwash center, track performance, and optimize your services from this dashboard.</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[7px] h-[59.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Paragraph2 />
    </div>
  );
}

function CardTitle() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[90.516px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[17.5px] relative w-[90.516px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[12.25px] text-neutral-950 text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Active Services</p>
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[17.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p2894200} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d="M8.75 16.0417V8.75" id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d={svgPaths.p3bcc7900} id="Vector_3" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d={svgPaths.p12679380} id="Vector_4" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
        </g>
      </svg>
    </div>
  );
}

function CardHeader() {
  return (
    <div className="absolute box-border content-stretch flex h-[45.5px] items-center justify-between left-px px-[21px] py-0 top-px w-[344.5px]" data-name="CardHeader">
      <CardTitle />
      <Icon11 />
    </div>
  );
}

function CarwashAdminDashboard() {
  return (
    <div className="absolute h-[28px] left-[22px] top-[67.5px] w-[302.5px]" data-name="CarwashAdminDashboard">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[21px] text-neutral-950 text-nowrap top-0 tracking-[-0.3589px] whitespace-pre">4</p>
    </div>
  );
}

function Card() {
  return (
    <div className="[grid-area:1_/_1] bg-white place-self-stretch relative rounded-[12.75px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <CardHeader />
      <CarwashAdminDashboard />
    </div>
  );
}

function CardTitle1() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[88.5px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[17.5px] relative w-[88.5px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[12.25px] text-neutral-950 text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Total Packages</p>
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[17.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p2894200} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d="M8.75 16.0417V8.75" id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d={svgPaths.p3bcc7900} id="Vector_3" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d={svgPaths.p12679380} id="Vector_4" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
        </g>
      </svg>
    </div>
  );
}

function CardHeader1() {
  return (
    <div className="absolute box-border content-stretch flex h-[45.5px] items-center justify-between left-px px-[21px] py-0 top-px w-[344.5px]" data-name="CardHeader">
      <CardTitle1 />
      <Icon12 />
    </div>
  );
}

function CarwashAdminDashboard1() {
  return (
    <div className="absolute h-[28px] left-[22px] top-[67.5px] w-[302.5px]" data-name="CarwashAdminDashboard">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[21px] text-neutral-950 text-nowrap top-0 tracking-[-0.3589px] whitespace-pre">1</p>
    </div>
  );
}

function Card1() {
  return (
    <div className="[grid-area:1_/_2] bg-white place-self-stretch relative rounded-[12.75px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <CardHeader1 />
      <CarwashAdminDashboard1 />
    </div>
  );
}

function CardTitle2() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[87.344px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[17.5px] relative w-[87.344px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[12.25px] text-neutral-950 text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Total Branches</p>
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[17.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M7.29167 8.75H10.2083" id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d="M7.29167 5.83333H10.2083" id="Vector_2" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d={svgPaths.p11cb7f90} id="Vector_3" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d={svgPaths.p3c76f900} id="Vector_4" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d={svgPaths.p2292c980} id="Vector_5" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
        </g>
      </svg>
    </div>
  );
}

function CardHeader2() {
  return (
    <div className="absolute box-border content-stretch flex h-[45.5px] items-center justify-between left-px px-[21px] py-0 top-px w-[344.5px]" data-name="CardHeader">
      <CardTitle2 />
      <Icon13 />
    </div>
  );
}

function CarwashAdminDashboard2() {
  return (
    <div className="absolute h-[28px] left-[22px] top-[67.5px] w-[302.5px]" data-name="CarwashAdminDashboard">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[21px] text-neutral-950 text-nowrap top-0 tracking-[-0.3589px] whitespace-pre">3</p>
    </div>
  );
}

function Card2() {
  return (
    <div className="[grid-area:1_/_3] bg-white place-self-stretch relative rounded-[12.75px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <CardHeader2 />
      <CarwashAdminDashboard2 />
    </div>
  );
}

function CardTitle3() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[105.734px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[17.5px] relative w-[105.734px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[12.25px] text-neutral-950 text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Active Campaigns</p>
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[17.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p1709a8f2} id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d={svgPaths.p39cbb700} id="Vector_2" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d="M5.83333 4.375V10.2083" id="Vector_3" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
        </g>
      </svg>
    </div>
  );
}

function CardHeader3() {
  return (
    <div className="absolute box-border content-stretch flex h-[45.5px] items-center justify-between left-px px-[21px] py-0 top-px w-[344.5px]" data-name="CardHeader">
      <CardTitle3 />
      <Icon14 />
    </div>
  );
}

function CarwashAdminDashboard3() {
  return (
    <div className="absolute h-[28px] left-[22px] top-[67.5px] w-[302.5px]" data-name="CarwashAdminDashboard">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[21px] text-neutral-950 text-nowrap top-0 tracking-[-0.3589px] whitespace-pre">1</p>
    </div>
  );
}

function Card3() {
  return (
    <div className="[grid-area:1_/_4] bg-white place-self-stretch relative rounded-[12.75px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <CardHeader3 />
      <CarwashAdminDashboard3 />
    </div>
  );
}

function Container10() {
  return (
    <div className="gap-[21px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[117.5px] relative shrink-0 w-full" data-name="Container">
      <Card />
      <Card1 />
      <Card2 />
      <Card3 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[17.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M5.83333 1.45833V4.375" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d="M11.6667 1.45833V4.375" id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d={svgPaths.p2ef46e0} id="Vector_3" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d="M2.1875 7.29167H15.3125" id="Vector_4" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
        </g>
      </svg>
    </div>
  );
}

function CardTitle4() {
  return (
    <div className="basis-0 grow h-[14px] min-h-px min-w-px relative shrink-0" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">{`Today's Schedule`}</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[7px] h-[17.5px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon15 />
      <CardTitle4 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#717182] text-[12.25px] text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Tuesday, Dec 9</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[38.5px] relative shrink-0 w-[138.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[3.5px] h-[38.5px] items-start relative w-[138.25px]">
        <Container11 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-[rgba(0,0,0,0)] h-[28px] relative rounded-[6.75px] shrink-0 w-[69.75px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[5.25px] h-[28px] items-center justify-center px-[11.5px] py-px relative w-[69.75px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] not-italic relative shrink-0 text-[12.25px] text-center text-neutral-950 text-nowrap tracking-[-0.0179px] whitespace-pre">View All</p>
      </div>
    </div>
  );
}

function CarwashAdminDashboard4() {
  return (
    <div className="absolute content-stretch flex h-[38.5px] items-center justify-between left-[22px] top-[22px] w-[1405px]" data-name="CarwashAdminDashboard">
      <Container12 />
      <Button9 />
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[24.5px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24.5px] left-[172.98px] not-italic text-[17.5px] text-center text-neutral-950 text-nowrap top-[-1px] tracking-[-0.4358px] translate-x-[-50%] whitespace-pre">19</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-[173.22px] not-italic text-[#717182] text-[10.5px] text-center text-nowrap top-0 tracking-[0.0923px] translate-x-[-50%] whitespace-pre">Total</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col items-start place-self-stretch relative shrink-0" data-name="Container">
      <Container13 />
      <Container14 />
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[24.5px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24.5px] left-[173.72px] not-italic text-[#d08700] text-[17.5px] text-center text-nowrap top-[-1px] tracking-[-0.4358px] translate-x-[-50%] whitespace-pre">0</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-[173.06px] not-italic text-[#717182] text-[10.5px] text-center text-nowrap top-0 tracking-[0.0923px] translate-x-[-50%] whitespace-pre">Pending</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="[grid-area:1_/_2] content-stretch flex flex-col items-start place-self-stretch relative shrink-0" data-name="Container">
      <Container16 />
      <Container17 />
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[24.5px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24.5px] left-[173.72px] not-italic text-[#155dfc] text-[17.5px] text-center text-nowrap top-[-1px] tracking-[-0.4358px] translate-x-[-50%] whitespace-pre">0</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-[173.11px] not-italic text-[#717182] text-[10.5px] text-center text-nowrap top-0 tracking-[0.0923px] translate-x-[-50%] whitespace-pre">Confirmed</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="[grid-area:1_/_3] content-stretch flex flex-col items-start place-self-stretch relative shrink-0" data-name="Container">
      <Container19 />
      <Container20 />
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[24.5px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24.5px] left-[173.23px] not-italic text-[#00a63e] text-[17.5px] text-center text-nowrap top-[-1px] tracking-[-0.4358px] translate-x-[-50%] whitespace-pre">1</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-[173.33px] not-italic text-[#717182] text-[10.5px] text-center text-nowrap top-0 tracking-[0.0923px] translate-x-[-50%] whitespace-pre">Done</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="[grid-area:1_/_4] content-stretch flex flex-col items-start place-self-stretch relative shrink-0" data-name="Container">
      <Container22 />
      <Container23 />
    </div>
  );
}

function CarwashAdminDashboard5() {
  return (
    <div className="box-border gap-[7px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[53.5px] pb-[15px] pt-0 px-0 relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <Container15 />
      <Container18 />
      <Container21 />
      <Container24 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[12.25px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="Icon">
          <path d={svgPaths.p19d9dc80} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
          <path d={svgPaths.p2845d00} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[36.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[17.5px] relative w-[36.422px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[17.5px] left-0 not-italic text-[12.25px] text-neutral-950 text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">06:30</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[65px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[5.25px] h-[17.5px] items-center relative w-[65px]">
        <Icon16 />
        <Text1 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[12.25px] text-neutral-950 text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Rachel Martinez</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Early Bird Express</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="basis-0 grow h-[31.5px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[31.5px] items-start relative w-full">
        <Container26 />
        <Container27 />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[22.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[17.5px] relative w-[22.328px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[17.5px] left-0 not-italic text-[#00a63e] text-[12.25px] top-0 tracking-[-0.0179px] w-[23px]">$14</p>
      </div>
    </div>
  );
}

function Badge() {
  return (
    <div className="basis-0 bg-[#f0b100] grow h-[17.5px] min-h-px min-w-px relative rounded-[6.75px] shrink-0" data-name="Badge">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[3.5px] h-[17.5px] items-center justify-center px-[7px] py-[1.75px] relative w-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] not-italic relative shrink-0 text-[10.5px] text-nowrap text-white tracking-[0.0923px] whitespace-pre">AI Campaign</p>
        </div>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[108.375px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[7px] h-[17.5px] items-center relative w-[108.375px]">
        <Text2 />
        <Badge />
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[51px] relative rounded-[8.75px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10.5px] h-[51px] items-center px-[9.75px] py-px relative w-full">
          <Container25 />
          <Container28 />
          <Container29 />
        </div>
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[12.25px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="Icon">
          <path d={svgPaths.p19d9dc80} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
          <path d={svgPaths.p2845d00} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[35.141px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[17.5px] relative w-[35.141px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[17.5px] left-0 not-italic text-[12.25px] text-neutral-950 text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">07:30</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[65px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[5.25px] h-[17.5px] items-center relative w-[65px]">
        <Icon17 />
        <Text3 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[12.25px] text-neutral-950 text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">George Scott</p>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Early Bird Express</p>
    </div>
  );
}

function Container34() {
  return (
    <div className="basis-0 grow h-[31.5px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[31.5px] items-start relative w-full">
        <Container32 />
        <Container33 />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[22.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[17.5px] relative w-[22.328px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[17.5px] left-0 not-italic text-[#00a63e] text-[12.25px] top-0 tracking-[-0.0179px] w-[23px]">$14</p>
      </div>
    </div>
  );
}

function Badge1() {
  return (
    <div className="basis-0 bg-[#f0b100] grow h-[17.5px] min-h-px min-w-px relative rounded-[6.75px] shrink-0" data-name="Badge">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[3.5px] h-[17.5px] items-center justify-center px-[7px] py-[1.75px] relative w-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] not-italic relative shrink-0 text-[10.5px] text-nowrap text-white tracking-[0.0923px] whitespace-pre">AI Campaign</p>
        </div>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[108.375px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[7px] h-[17.5px] items-center relative w-[108.375px]">
        <Text4 />
        <Badge1 />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[51px] relative rounded-[8.75px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10.5px] h-[51px] items-center px-[9.75px] py-px relative w-full">
          <Container31 />
          <Container34 />
          <Container35 />
        </div>
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[12.25px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="Icon">
          <path d={svgPaths.p19d9dc80} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
          <path d={svgPaths.p2845d00} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
        </g>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[36.516px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[17.5px] relative w-[36.516px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[17.5px] left-0 not-italic text-[12.25px] text-neutral-950 text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">08:30</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[65px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[5.25px] h-[17.5px] items-center relative w-[65px]">
        <Icon18 />
        <Text5 />
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[12.25px] text-neutral-950 text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Robert Kim</p>
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Premium Complete Package</p>
    </div>
  );
}

function Container40() {
  return (
    <div className="basis-0 grow h-[31.5px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[31.5px] items-start relative w-full">
        <Container38 />
        <Container39 />
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[23.281px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[17.5px] relative w-[23.281px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[17.5px] left-0 not-italic text-[#00a63e] text-[12.25px] top-0 tracking-[-0.0179px] w-[24px]">$70</p>
      </div>
    </div>
  );
}

function Badge2() {
  return (
    <div className="basis-0 bg-[#2b7fff] grow h-[17.5px] min-h-px min-w-px relative rounded-[6.75px] shrink-0" data-name="Badge">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[3.5px] h-[17.5px] items-center justify-center px-[7px] py-[1.75px] relative w-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] not-italic relative shrink-0 text-[10.5px] text-nowrap text-white tracking-[0.0923px] whitespace-pre">Reserved</p>
        </div>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[92.266px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[7px] h-[17.5px] items-center relative w-[92.266px]">
        <Text6 />
        <Badge2 />
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="h-[51px] relative rounded-[8.75px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10.5px] h-[51px] items-center px-[9.75px] py-px relative w-full">
          <Container37 />
          <Container40 />
          <Container41 />
        </div>
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[12.25px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="Icon">
          <path d={svgPaths.p19d9dc80} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
          <path d={svgPaths.p2845d00} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
        </g>
      </svg>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[36.531px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[17.5px] relative w-[36.531px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[17.5px] left-0 not-italic text-[12.25px] text-neutral-950 text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">09:00</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[65px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[5.25px] h-[17.5px] items-center relative w-[65px]">
        <Icon19 />
        <Text7 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[12.25px] text-neutral-950 text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Jane Smith</p>
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Premium Detail</p>
    </div>
  );
}

function Container46() {
  return (
    <div className="basis-0 grow h-[31.5px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[31.5px] items-start relative w-full">
        <Container44 />
        <Container45 />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[24.234px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[17.5px] relative w-[24.234px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[17.5px] left-0 not-italic text-[#00a63e] text-[12.25px] top-0 tracking-[-0.0179px] w-[25px]">$85</p>
      </div>
    </div>
  );
}

function Badge3() {
  return (
    <div className="basis-0 bg-[#2b7fff] grow h-[17.5px] min-h-px min-w-px relative rounded-[6.75px] shrink-0" data-name="Badge">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[3.5px] h-[17.5px] items-center justify-center px-[7px] py-[1.75px] relative w-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] not-italic relative shrink-0 text-[10.5px] text-nowrap text-white tracking-[0.0923px] whitespace-pre">Reserved</p>
        </div>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[93.219px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[7px] h-[17.5px] items-center relative w-[93.219px]">
        <Text8 />
        <Badge3 />
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="h-[51px] relative rounded-[8.75px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10.5px] h-[51px] items-center px-[9.75px] py-px relative w-full">
          <Container43 />
          <Container46 />
          <Container47 />
        </div>
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[12.25px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="Icon">
          <path d={svgPaths.p19d9dc80} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
          <path d={svgPaths.p2845d00} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
        </g>
      </svg>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[34.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[17.5px] relative w-[34.406px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[17.5px] left-0 not-italic text-[12.25px] text-neutral-950 text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">10:00</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[65px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[5.25px] h-[17.5px] items-center relative w-[65px]">
        <Icon20 />
        <Text9 />
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[12.25px] text-neutral-950 text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Sandra Nelson</p>
    </div>
  );
}

function Container51() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Premium Complete Package</p>
    </div>
  );
}

function Container52() {
  return (
    <div className="basis-0 grow h-[31.5px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[31.5px] items-start relative w-full">
        <Container50 />
        <Container51 />
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[23.281px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[17.5px] relative w-[23.281px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[17.5px] left-0 not-italic text-[#00a63e] text-[12.25px] top-0 tracking-[-0.0179px] w-[24px]">$70</p>
      </div>
    </div>
  );
}

function Badge4() {
  return (
    <div className="basis-0 bg-[#2b7fff] grow h-[17.5px] min-h-px min-w-px relative rounded-[6.75px] shrink-0" data-name="Badge">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[3.5px] h-[17.5px] items-center justify-center px-[7px] py-[1.75px] relative w-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] not-italic relative shrink-0 text-[10.5px] text-nowrap text-white tracking-[0.0923px] whitespace-pre">Reserved</p>
        </div>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[92.266px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[7px] h-[17.5px] items-center relative w-[92.266px]">
        <Text10 />
        <Badge4 />
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[51px] relative rounded-[8.75px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10.5px] h-[51px] items-center px-[9.75px] py-px relative w-full">
          <Container49 />
          <Container52 />
          <Container53 />
        </div>
      </div>
    </div>
  );
}

function CarwashAdminDashboard6() {
  return (
    <div className="content-stretch flex flex-col gap-[7px] h-[283px] items-start relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <Container30 />
      <Container36 />
      <Container42 />
      <Container48 />
      <Container54 />
    </div>
  );
}

function Button10() {
  return (
    <div className="h-[28px] relative rounded-[6.75px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-[702.83px] not-italic text-[12.25px] text-center text-neutral-950 top-[5.25px] tracking-[-0.0179px] translate-x-[-50%] w-[113px]">+14 more bookings</p>
    </div>
  );
}

function CardContent() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[14px] h-[410px] items-start left-px px-[21px] py-0 top-[86.75px] w-[1447px]" data-name="CardContent">
      <CarwashAdminDashboard5 />
      <CarwashAdminDashboard6 />
      <Button10 />
    </div>
  );
}

function Card4() {
  return (
    <div className="bg-white h-[497.75px] relative rounded-[12.75px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <CarwashAdminDashboard4 />
      <CardContent />
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[21px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
        <g id="Icon">
          <path d={svgPaths.p5a8bd00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
          <path d="M10.5 15.75H10.5088" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
        </g>
      </svg>
    </div>
  );
}

function Container55() {
  return (
    <div className="relative rounded-[3.35544e+07px] shrink-0 size-[42px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[42px]">
        <Icon21 />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#1c398e] text-[14px] text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Customer App Impact</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#1447e6] text-[12.25px] text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Direct bookings through Letwash marketplace</p>
    </div>
  );
}

function Container56() {
  return (
    <div className="basis-0 grow h-[38.5px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[38.5px] items-start relative w-full">
        <Heading2 />
        <Paragraph4 />
      </div>
    </div>
  );
}

function CarwashAdminDashboard7() {
  return (
    <div className="absolute content-stretch flex gap-[10.5px] h-[42px] items-center left-[21px] top-[21px] w-[317.125px]" data-name="CarwashAdminDashboard">
      <Container55 />
      <Container56 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#1447e6] text-[12.25px] text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">New Customers Acquired</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="absolute content-stretch flex h-[31.5px] items-start left-0 top-0 w-[32.688px]" data-name="Paragraph">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[31.5px] not-italic relative shrink-0 text-[#1c398e] text-[26.25px] text-nowrap tracking-[0.2355px] whitespace-pre">87</p>
    </div>
  );
}

function Icon22() {
  return (
    <div className="absolute left-[7px] size-[10.5px] top-[3.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
        <g clipPath="url(#clip0_23244_8386)" id="Icon">
          <path d="M7 3.0625H9.625V5.6875" id="Vector" stroke="var(--stroke-0, #008236)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p37c4f4d0} id="Vector_2" stroke="var(--stroke-0, #008236)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
        </g>
        <defs>
          <clipPath id="clip0_23244_8386">
            <rect fill="white" height="10.5" width="10.5" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Badge5() {
  return (
    <div className="absolute bg-green-100 border border-[#b9f8cf] border-solid h-[19.5px] left-[39.69px] overflow-clip rounded-[6.75px] top-[10px] w-[64px]" data-name="Badge">
      <Icon22 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-[24.5px] not-italic text-[#008236] text-[10.5px] text-nowrap top-[1.75px] tracking-[0.0923px] whitespace-pre">+24%</p>
    </div>
  );
}

function Container57() {
  return (
    <div className="h-[31.5px] relative shrink-0 w-full" data-name="Container">
      <Paragraph6 />
      <Badge5 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#155dfc] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">This month</p>
    </div>
  );
}

function Container58() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[3.5px] items-start place-self-stretch relative shrink-0" data-name="Container">
      <Paragraph5 />
      <Container57 />
      <Paragraph7 />
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#1447e6] text-[12.25px] text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Revenue Generated</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="absolute content-stretch flex h-[31.5px] items-start left-0 top-0 w-[91.219px]" data-name="Paragraph">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[31.5px] not-italic relative shrink-0 text-[#1c398e] text-[26.25px] text-nowrap tracking-[0.2355px] whitespace-pre">$3,240</p>
    </div>
  );
}

function Icon23() {
  return (
    <div className="absolute left-[7px] size-[10.5px] top-[3.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
        <g clipPath="url(#clip0_23244_8382)" id="Icon">
          <path d="M5.25 0.875V9.625" id="Vector" stroke="var(--stroke-0, #008236)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p29f63998} id="Vector_2" stroke="var(--stroke-0, #008236)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
        </g>
        <defs>
          <clipPath id="clip0_23244_8382">
            <rect fill="white" height="10.5" width="10.5" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Badge6() {
  return (
    <div className="absolute bg-green-100 border border-[#b9f8cf] border-solid h-[19.5px] left-[98.22px] overflow-clip rounded-[6.75px] top-[10px] w-[62.672px]" data-name="Badge">
      <Icon23 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-[24.5px] not-italic text-[#008236] text-[10.5px] text-nowrap top-[1.75px] tracking-[0.0923px] whitespace-pre">+18%</p>
    </div>
  );
}

function Container59() {
  return (
    <div className="h-[31.5px] relative shrink-0 w-full" data-name="Container">
      <Paragraph9 />
      <Badge6 />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#155dfc] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">From app bookings</p>
    </div>
  );
}

function Container60() {
  return (
    <div className="[grid-area:1_/_2] content-stretch flex flex-col gap-[3.5px] items-start place-self-stretch relative shrink-0" data-name="Container">
      <Paragraph8 />
      <Container59 />
      <Paragraph10 />
    </div>
  );
}

function CarwashAdminDashboard8() {
  return (
    <div className="absolute gap-[21px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[70px] left-[21px] top-[84px] w-[1405px]" data-name="CarwashAdminDashboard">
      <Container58 />
      <Container60 />
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[#1c398e] text-[12.25px] text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">App Conversion Rate</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#155dfc] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Downloads to bookings</p>
    </div>
  );
}

function Container61() {
  return (
    <div className="h-[31.5px] relative shrink-0 w-[123.109px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[31.5px] items-start relative w-[123.109px]">
        <Paragraph11 />
        <Paragraph12 />
      </div>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-[96.55px] not-italic text-[#1c398e] text-[21px] text-nowrap text-right top-0 tracking-[-0.3589px] translate-x-[-100%] whitespace-pre">42%</p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-[97px] not-italic text-[#00a63e] text-[10.5px] text-nowrap text-right top-0 tracking-[0.0923px] translate-x-[-100%] whitespace-pre">Above industry avg</p>
    </div>
  );
}

function Container62() {
  return (
    <div className="h-[42px] relative shrink-0 w-[96.359px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[42px] items-start relative w-[96.359px]">
        <Paragraph13 />
        <Paragraph14 />
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex h-[42px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container61 />
      <Container62 />
    </div>
  );
}

function CarwashAdminDashboard9() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[57px] items-start left-[21px] pb-0 pt-[15px] px-0 top-[175px] w-[1405px]" data-name="CarwashAdminDashboard">
      <div aria-hidden="true" className="absolute border-[#bedbff] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Container63 />
    </div>
  );
}

function CardContent1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1447px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full relative w-[1447px]">
        <CarwashAdminDashboard7 />
        <CarwashAdminDashboard8 />
        <CarwashAdminDashboard9 />
      </div>
    </div>
  );
}

function Card5() {
  return (
    <div className="box-border content-stretch flex flex-col h-[255px] items-start p-px relative rounded-[12.75px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <CardContent1 />
    </div>
  );
}

function Icon24() {
  return (
    <div className="absolute left-0 size-[17.5px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p116d0080} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d={svgPaths.p2a6d1550} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
        </g>
      </svg>
    </div>
  );
}

function CardTitle5() {
  return (
    <div className="absolute h-[17.5px] left-[22px] top-[22px] w-[670px]" data-name="CardTitle">
      <Icon24 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-[24.5px] not-italic text-[14px] text-neutral-950 text-nowrap top-[1.75px] tracking-[-0.1504px] whitespace-pre">Performance Overview</p>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[99.078px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[17.5px] relative w-[99.078px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#717182] text-[12.25px] text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Monthly Revenue</p>
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[21px] relative shrink-0 w-[49.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[49.422px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">$8,450</p>
      </div>
    </div>
  );
}

function CarwashAdminDashboard10() {
  return (
    <div className="content-stretch flex h-[21px] items-center justify-between relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <Text11 />
      <Text12 />
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[102.891px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[17.5px] relative w-[102.891px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#717182] text-[12.25px] text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Monthly Bookings</p>
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[21px] relative shrink-0 w-[24.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[24.922px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">156</p>
      </div>
    </div>
  );
}

function CarwashAdminDashboard11() {
  return (
    <div className="content-stretch flex h-[21px] items-center justify-between relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <Text13 />
      <Text14 />
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[86.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[17.5px] relative w-[86.75px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#717182] text-[12.25px] text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Average Rating</p>
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[21px] relative shrink-0 w-[43.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[43.75px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#00a63e] text-[14px] text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">4.8 ⭐</p>
      </div>
    </div>
  );
}

function CarwashAdminDashboard12() {
  return (
    <div className="content-stretch flex h-[21px] items-center justify-between relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <Text15 />
      <Text16 />
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[127.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[17.5px] relative w-[127.563px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#717182] text-[12.25px] text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Customer Satisfaction</p>
      </div>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[21px] relative shrink-0 w-[32.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[32.25px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#00a63e] text-[14px] text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">96%</p>
      </div>
    </div>
  );
}

function CarwashAdminDashboard13() {
  return (
    <div className="content-stretch flex h-[21px] items-center justify-between relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <Text17 />
      <Text18 />
    </div>
  );
}

function CardContent2() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[14px] h-[147px] items-start left-px px-[21px] py-0 top-[65.75px] w-[712px]" data-name="CardContent">
      <CarwashAdminDashboard10 />
      <CarwashAdminDashboard11 />
      <CarwashAdminDashboard12 />
      <CarwashAdminDashboard13 />
    </div>
  );
}

function Card6() {
  return (
    <div className="[grid-area:1_/_1] bg-white place-self-stretch relative rounded-[12.75px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <CardTitle5 />
      <CardContent2 />
    </div>
  );
}

function Icon25() {
  return (
    <div className="absolute left-0 size-[17.5px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p2e712080} fill="var(--fill-0, #F0B100)" id="Vector" stroke="var(--stroke-0, #F0B100)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
        </g>
      </svg>
    </div>
  );
}

function CardTitle6() {
  return (
    <div className="absolute h-[17.5px] left-[22px] top-[22px] w-[670px]" data-name="CardTitle">
      <Icon25 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-[24.5px] not-italic text-[14px] text-neutral-950 text-nowrap top-[1.75px] tracking-[-0.1504px] whitespace-pre">Customer Reviews</p>
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[78.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[17.5px] relative w-[78.422px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#717182] text-[12.25px] text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Total Reviews</p>
      </div>
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[21px] relative shrink-0 w-[23.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[23.609px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">127</p>
      </div>
    </div>
  );
}

function CarwashAdminDashboard14() {
  return (
    <div className="content-stretch flex h-[21px] items-center justify-between relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <Text19 />
      <Text20 />
    </div>
  );
}

function Text21() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[86.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[17.5px] relative w-[86.75px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#717182] text-[12.25px] text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Average Rating</p>
      </div>
    </div>
  );
}

function Text22() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">4.7</p>
      </div>
    </div>
  );
}

function Icon26() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p158a9780} fill="var(--fill-0, #FDC700)" id="Vector" stroke="var(--stroke-0, #FDC700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container64() {
  return (
    <div className="h-[21px] relative shrink-0 w-[38.594px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[3.5px] h-[21px] items-center relative w-[38.594px]">
        <Text22 />
        <Icon26 />
      </div>
    </div>
  );
}

function CarwashAdminDashboard15() {
  return (
    <div className="content-stretch flex h-[21px] items-center justify-between relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <Text21 />
      <Container64 />
    </div>
  );
}

function Text23() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[85.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[17.5px] relative w-[85.844px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#717182] text-[12.25px] text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Response Rate</p>
      </div>
    </div>
  );
}

function Text24() {
  return (
    <div className="h-[21px] relative shrink-0 w-[31.297px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[31.297px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#00a63e] text-[14px] text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">87%</p>
      </div>
    </div>
  );
}

function CarwashAdminDashboard16() {
  return (
    <div className="content-stretch flex h-[21px] items-center justify-between relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <Text23 />
      <Text24 />
    </div>
  );
}

function Text25() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[97.188px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[17.5px] relative w-[97.188px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#717182] text-[12.25px] text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Pending Reviews</p>
      </div>
    </div>
  );
}

function Badge7() {
  return (
    <div className="bg-[#eceef2] h-[19.5px] relative rounded-[6.75px] shrink-0 w-[22.828px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[3.5px] h-[19.5px] items-center justify-center overflow-clip px-[8px] py-[2.75px] relative rounded-[inherit] w-[22.828px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] not-italic relative shrink-0 text-[#030213] text-[10.5px] text-nowrap tracking-[0.0923px] whitespace-pre">3</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
    </div>
  );
}

function CarwashAdminDashboard17() {
  return (
    <div className="content-stretch flex h-[19.5px] items-center justify-between relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <Text25 />
      <Badge7 />
    </div>
  );
}

function Icon27() {
  return (
    <div className="absolute left-[271.97px] size-[14px] top-[8.75px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p2a5a140} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="bg-[rgba(0,0,0,0)] h-[31.5px] relative rounded-[6.75px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
      <Icon27 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-[349.47px] not-italic text-[12.25px] text-center text-neutral-950 text-nowrap top-[7px] tracking-[-0.0179px] translate-x-[-50%] whitespace-pre">Manage Reviews</p>
    </div>
  );
}

function CardContent3() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[14px] h-[198px] items-start left-px px-[21px] py-0 top-[65.75px] w-[712px]" data-name="CardContent">
      <CarwashAdminDashboard14 />
      <CarwashAdminDashboard15 />
      <CarwashAdminDashboard16 />
      <CarwashAdminDashboard17 />
      <Button11 />
    </div>
  );
}

function Card7() {
  return (
    <div className="[grid-area:1_/_2] bg-white place-self-stretch relative rounded-[12.75px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <CardTitle6 />
      <CardContent3 />
    </div>
  );
}

function Container65() {
  return (
    <div className="gap-[21px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[264.75px] relative shrink-0 w-full" data-name="Container">
      <Card6 />
      <Card7 />
    </div>
  );
}

function Icon28() {
  return (
    <div className="absolute left-0 size-[17.5px] top-[3.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p8295a80} id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d={svgPaths.p3924400} id="Vector_2" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
        </g>
      </svg>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[24.5px] relative shrink-0 w-full" data-name="Heading 3">
      <Icon28 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24.5px] left-[24.5px] not-italic text-[17.5px] text-neutral-950 text-nowrap top-[-1px] tracking-[-0.4358px] whitespace-pre">Peak Time Analytics</p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Optimize your business with peak hour insights</p>
    </div>
  );
}

function Container66() {
  return (
    <div className="h-[45.5px] relative shrink-0 w-[303.891px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[45.5px] items-start relative w-[303.891px]">
        <Heading4 />
        <Paragraph15 />
      </div>
    </div>
  );
}

function Icon29() {
  return (
    <div className="absolute left-[11.5px] size-[14px] top-[8.75px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p8832196} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M10.5 9.91667V5.25" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M7.58333 9.91667V2.91667" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.66667 9.91667V8.16667" id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div className="bg-[rgba(0,0,0,0)] h-[31.5px] relative rounded-[6.75px] shrink-0 w-[188.984px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[31.5px] relative w-[188.984px]">
        <Icon29 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-[108.5px] not-italic text-[12.25px] text-center text-neutral-950 text-nowrap top-[7px] tracking-[-0.0179px] translate-x-[-50%] whitespace-pre">View Detailed Analytics</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex h-[45.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container66 />
      <Button12 />
    </div>
  );
}

function CarwashAdminDashboard18() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#f54900] text-[21px] text-nowrap top-0 tracking-[-0.3589px] whitespace-pre">3</p>
    </div>
  );
}

function CarwashAdminDashboard19() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Active Peak Campaigns</p>
    </div>
  );
}

function CardContent4() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[349.75px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start pb-0 pt-[21px] px-[21px] relative w-[349.75px]">
        <CarwashAdminDashboard18 />
        <CarwashAdminDashboard19 />
      </div>
    </div>
  );
}

function Card8() {
  return (
    <div className="[grid-area:1_/_1] bg-white box-border content-stretch flex flex-col items-start p-px place-self-stretch relative rounded-[12.75px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <CardContent4 />
    </div>
  );
}

function CarwashAdminDashboard20() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#00a63e] text-[21px] text-nowrap top-0 tracking-[-0.3589px] whitespace-pre">$3,990</p>
    </div>
  );
}

function CarwashAdminDashboard21() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Peak Time Revenue</p>
    </div>
  );
}

function CardContent5() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[349.75px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start pb-0 pt-[21px] px-[21px] relative w-[349.75px]">
        <CarwashAdminDashboard20 />
        <CarwashAdminDashboard21 />
      </div>
    </div>
  );
}

function Card9() {
  return (
    <div className="[grid-area:1_/_2] bg-white box-border content-stretch flex flex-col items-start p-px place-self-stretch relative rounded-[12.75px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <CardContent5 />
    </div>
  );
}

function CarwashAdminDashboard22() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#155dfc] text-[21px] top-0 tracking-[-0.3589px] w-[48px]">68%</p>
    </div>
  );
}

function CarwashAdminDashboard23() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Peak Conversion Rate</p>
    </div>
  );
}

function CardContent6() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[349.75px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start pb-0 pt-[21px] px-[21px] relative w-[349.75px]">
        <CarwashAdminDashboard22 />
        <CarwashAdminDashboard23 />
      </div>
    </div>
  );
}

function Card10() {
  return (
    <div className="[grid-area:1_/_3] bg-white box-border content-stretch flex flex-col items-start p-px place-self-stretch relative rounded-[12.75px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <CardContent6 />
    </div>
  );
}

function CarwashAdminDashboard24() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#9810fa] text-[21px] top-0 tracking-[-0.3589px] w-[51px]">8min</p>
    </div>
  );
}

function CarwashAdminDashboard25() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Avg Peak Wait Time</p>
    </div>
  );
}

function CardContent7() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[349.75px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start pb-0 pt-[21px] px-[21px] relative w-[349.75px]">
        <CarwashAdminDashboard24 />
        <CarwashAdminDashboard25 />
      </div>
    </div>
  );
}

function Card11() {
  return (
    <div className="[grid-area:1_/_4] bg-white box-border content-stretch flex flex-col items-start p-px place-self-stretch relative rounded-[12.75px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <CardContent7 />
    </div>
  );
}

function Container68() {
  return (
    <div className="gap-[14px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[86px] relative shrink-0 w-full" data-name="Container">
      <Card8 />
      <Card9 />
      <Card10 />
      <Card11 />
    </div>
  );
}

function Icon30() {
  return (
    <div className="absolute left-0 size-[17.5px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p8295a80} id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d={svgPaths.p3924400} id="Vector_2" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
        </g>
      </svg>
    </div>
  );
}

function CardTitle7() {
  return (
    <div className="absolute h-[17.5px] left-[22px] top-[22px] w-[670px]" data-name="CardTitle">
      <Icon30 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-[24.5px] not-italic text-[14px] text-neutral-950 text-nowrap top-[1.75px] tracking-[-0.1504px] whitespace-pre">Peak Hour Performance</p>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">5:00 PM - 7:00 PM</p>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#717182] text-[12.25px] top-0 tracking-[-0.0179px] w-[72px]">24 bookings</p>
    </div>
  );
}

function Container69() {
  return (
    <div className="h-[38.5px] relative shrink-0 w-[124.219px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[38.5px] items-start relative w-[124.219px]">
        <Paragraph16 />
        <Paragraph17 />
      </div>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[78.7px] not-italic text-[#00a63e] text-[14px] text-right top-0 tracking-[-0.1504px] translate-x-[-100%] w-[44px]">$1680</p>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-[79px] not-italic text-[#717182] text-[12.25px] text-right top-0 tracking-[-0.0179px] translate-x-[-100%] w-[79px]">87% capacity</p>
    </div>
  );
}

function Container70() {
  return (
    <div className="h-[38.5px] relative shrink-0 w-[78.203px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[38.5px] items-start relative w-[78.203px]">
        <Paragraph18 />
        <Paragraph19 />
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="bg-[rgba(236,236,240,0.5)] h-[59.5px] relative rounded-[8.75px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[59.5px] items-center justify-between px-[10.5px] py-0 relative w-full">
          <Container69 />
          <Container70 />
        </div>
      </div>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">12:00 PM - 2:00 PM</p>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#717182] text-[12.25px] top-0 tracking-[-0.0179px] w-[70px]">18 bookings</p>
    </div>
  );
}

function Container72() {
  return (
    <div className="h-[38.5px] relative shrink-0 w-[131.188px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[38.5px] items-start relative w-[131.188px]">
        <Paragraph20 />
        <Paragraph21 />
      </div>
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[77.94px] not-italic text-[#00a63e] text-[14px] text-right top-0 tracking-[-0.1504px] translate-x-[-100%] w-[43px]">$1260</p>
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-[78px] not-italic text-[#717182] text-[12.25px] text-right top-0 tracking-[-0.0179px] translate-x-[-100%] w-[78px]">75% capacity</p>
    </div>
  );
}

function Container73() {
  return (
    <div className="h-[38.5px] relative shrink-0 w-[77.844px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[38.5px] items-start relative w-[77.844px]">
        <Paragraph22 />
        <Paragraph23 />
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="bg-[rgba(236,236,240,0.5)] h-[59.5px] relative rounded-[8.75px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[59.5px] items-center justify-between px-[10.5px] py-0 relative w-full">
          <Container72 />
          <Container73 />
        </div>
      </div>
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">10:00 AM - 12:00 PM</p>
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#717182] text-[12.25px] top-0 tracking-[-0.0179px] w-[70px]">15 bookings</p>
    </div>
  );
}

function Container75() {
  return (
    <div className="h-[38.5px] relative shrink-0 w-[138.797px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[38.5px] items-start relative w-[138.797px]">
        <Paragraph24 />
        <Paragraph25 />
      </div>
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[79.64px] not-italic text-[#00a63e] text-[14px] text-right top-0 tracking-[-0.1504px] translate-x-[-100%] w-[44px]">$1050</p>
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-[79px] not-italic text-[#717182] text-[12.25px] text-right top-0 tracking-[-0.0179px] translate-x-[-100%] w-[79px]">65% capacity</p>
    </div>
  );
}

function Container76() {
  return (
    <div className="h-[38.5px] relative shrink-0 w-[78.781px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[38.5px] items-start relative w-[78.781px]">
        <Paragraph26 />
        <Paragraph27 />
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="bg-[rgba(236,236,240,0.5)] h-[59.5px] relative rounded-[8.75px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[59.5px] items-center justify-between px-[10.5px] py-0 relative w-full">
          <Container75 />
          <Container76 />
        </div>
      </div>
    </div>
  );
}

function CarwashAdminDashboard26() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] h-[206.5px] items-start relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <Container71 />
      <Container74 />
      <Container77 />
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[#9f2d00] text-[12.25px] top-0 tracking-[-0.0179px] w-[221px]">🏆 Top Performer: 5:00 PM - 7:00 PM</p>
    </div>
  );
}

function Paragraph29() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#f54900] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Best performing time slot this week</p>
    </div>
  );
}

function CarwashAdminDashboard27() {
  return (
    <div className="bg-orange-50 h-[58px] relative rounded-[8.75px] shrink-0 w-full" data-name="CarwashAdminDashboard">
      <div aria-hidden="true" className="absolute border border-[#ffd6a7] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[3.5px] h-[58px] items-start pb-px pt-[11.5px] px-[11.5px] relative w-full">
          <Paragraph28 />
          <Paragraph29 />
        </div>
      </div>
    </div>
  );
}

function CardContent8() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[14px] h-[299.5px] items-start left-px px-[21px] py-0 top-[65.75px] w-[712px]" data-name="CardContent">
      <CarwashAdminDashboard26 />
      <CarwashAdminDashboard27 />
    </div>
  );
}

function Card12() {
  return (
    <div className="[grid-area:1_/_1] bg-white place-self-stretch relative rounded-[12.75px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <CardTitle7 />
      <CardContent8 />
    </div>
  );
}

function Icon31() {
  return (
    <div className="absolute left-0 size-[17.5px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p1e0e7340} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d="M13.125 12.3958V6.5625" id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d="M9.47917 12.3958V3.64583" id="Vector_3" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d="M5.83333 12.3958V10.2083" id="Vector_4" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
        </g>
      </svg>
    </div>
  );
}

function CardTitle8() {
  return (
    <div className="absolute h-[17.5px] left-[22px] top-[22px] w-[670px]" data-name="CardTitle">
      <Icon31 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-[24.5px] not-italic text-[14px] text-neutral-950 text-nowrap top-[1.75px] tracking-[-0.1504px] whitespace-pre">Peak Time Insights</p>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Busiest Days</p>
    </div>
  );
}

function Text26() {
  return (
    <div className="absolute bg-blue-100 h-[21px] left-0 rounded-[3.35544e+07px] top-0 w-[44.906px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-[7px] not-italic text-[#1447e6] text-[10.5px] text-nowrap top-[3.5px] tracking-[0.0923px] whitespace-pre">Friday</p>
    </div>
  );
}

function Text27() {
  return (
    <div className="absolute bg-blue-100 h-[21px] left-[51.91px] rounded-[3.35544e+07px] top-0 w-[58.75px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-[7px] not-italic text-[#1447e6] text-[10.5px] text-nowrap top-[3.5px] tracking-[0.0923px] whitespace-pre">Saturday</p>
    </div>
  );
}

function Text28() {
  return (
    <div className="absolute bg-blue-100 h-[21px] left-[117.66px] rounded-[3.35544e+07px] top-0 w-[51.25px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-[7px] not-italic text-[#1447e6] text-[10.5px] text-nowrap top-[3.5px] tracking-[0.0923px] whitespace-pre">Sunday</p>
    </div>
  );
}

function Container78() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <Text26 />
      <Text27 />
      <Text28 />
    </div>
  );
}

function Container79() {
  return (
    <div className="content-stretch flex flex-col gap-[7px] h-[49px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading3 />
      <Container78 />
    </div>
  );
}

function Paragraph30() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#717182] text-[12.25px] text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Recommended Capacity</p>
    </div>
  );
}

function Paragraph31() {
  return (
    <div className="h-[24.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24.5px] left-0 not-italic text-[#155dfc] text-[17.5px] text-nowrap top-[-1px] tracking-[-0.4358px] whitespace-pre">12</p>
    </div>
  );
}

function Paragraph32() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">vehicles/hour</p>
    </div>
  );
}

function Container80() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col items-start place-self-stretch relative shrink-0" data-name="Container">
      <Paragraph30 />
      <Paragraph31 />
      <Paragraph32 />
    </div>
  );
}

function Paragraph33() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#717182] text-[12.25px] text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Customer Satisfaction</p>
    </div>
  );
}

function Paragraph34() {
  return (
    <div className="h-[24.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24.5px] left-0 not-italic text-[#00a63e] text-[17.5px] top-[-1px] tracking-[-0.4358px] w-[40px]">92%</p>
    </div>
  );
}

function Paragraph35() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">during peak hours</p>
    </div>
  );
}

function Container81() {
  return (
    <div className="[grid-area:1_/_2] content-stretch flex flex-col items-start place-self-stretch relative shrink-0" data-name="Container">
      <Paragraph33 />
      <Paragraph34 />
      <Paragraph35 />
    </div>
  );
}

function Container82() {
  return (
    <div className="gap-[14px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[56px] relative shrink-0 w-full" data-name="Container">
      <Container80 />
      <Container81 />
    </div>
  );
}

function CarwashAdminDashboard28() {
  return (
    <div className="content-stretch flex flex-col gap-[10.5px] h-[115.5px] items-start relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <Container79 />
      <Container82 />
    </div>
  );
}

function Paragraph36() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[#193cb8] text-[12.25px] text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">💡 Optimization Tip</p>
    </div>
  );
}

function Paragraph37() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#155dfc] text-[10.5px] top-0 tracking-[0.0923px] w-[412px]">Consider running flash campaigns during 5:00 PM - 7:00 PM to maximize revenue</p>
    </div>
  );
}

function CarwashAdminDashboard29() {
  return (
    <div className="bg-blue-50 h-[58px] relative rounded-[8.75px] shrink-0 w-full" data-name="CarwashAdminDashboard">
      <div aria-hidden="true" className="absolute border border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[3.5px] h-[58px] items-start pb-px pt-[11.5px] px-[11.5px] relative w-full">
          <Paragraph36 />
          <Paragraph37 />
        </div>
      </div>
    </div>
  );
}

function CardContent9() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[14px] h-[208.5px] items-start left-px px-[21px] py-0 top-[65.75px] w-[712px]" data-name="CardContent">
      <CarwashAdminDashboard28 />
      <CarwashAdminDashboard29 />
    </div>
  );
}

function Card13() {
  return (
    <div className="[grid-area:1_/_2] bg-white place-self-stretch relative rounded-[12.75px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <CardTitle8 />
      <CardContent9 />
    </div>
  );
}

function Container83() {
  return (
    <div className="gap-[21px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[366.25px] relative shrink-0 w-full" data-name="Container">
      <Card12 />
      <Card13 />
    </div>
  );
}

function Icon32() {
  return (
    <div className="absolute left-0 size-[17.5px] top-[3.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p8295a80} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d={svgPaths.p3924400} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
        </g>
      </svg>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[24.5px] relative shrink-0 w-full" data-name="Heading 3">
      <Icon32 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24.5px] left-[24.5px] not-italic text-[17.5px] text-neutral-950 text-nowrap top-[-1px] tracking-[-0.4358px] whitespace-pre">Lowest Hours Analytics</p>
    </div>
  );
}

function Paragraph38() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Identify growth opportunities during quiet periods</p>
    </div>
  );
}

function Container84() {
  return (
    <div className="absolute content-stretch flex flex-col h-[45.5px] items-start left-0 top-0 w-[320.609px]" data-name="Container">
      <Heading5 />
      <Paragraph38 />
    </div>
  );
}

function CarwashAdminDashboard30() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#4a5565] text-[21px] top-0 tracking-[-0.3589px] w-[47px]">20%</p>
    </div>
  );
}

function CarwashAdminDashboard31() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Avg Capacity Used</p>
    </div>
  );
}

function CardContent10() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[349.75px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start pb-0 pt-[21px] px-[21px] relative w-[349.75px]">
        <CarwashAdminDashboard30 />
        <CarwashAdminDashboard31 />
      </div>
    </div>
  );
}

function Card14() {
  return (
    <div className="[grid-area:1_/_1] bg-white box-border content-stretch flex flex-col items-start p-px place-self-stretch relative rounded-[12.75px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <CardContent10 />
    </div>
  );
}

function CarwashAdminDashboard32() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#d08700] text-[21px] text-nowrap top-0 tracking-[-0.3589px] whitespace-pre">$1,850</p>
    </div>
  );
}

function CarwashAdminDashboard33() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Opportunity Revenue</p>
    </div>
  );
}

function CardContent11() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[349.75px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start pb-0 pt-[21px] px-[21px] relative w-[349.75px]">
        <CarwashAdminDashboard32 />
        <CarwashAdminDashboard33 />
      </div>
    </div>
  );
}

function Card15() {
  return (
    <div className="[grid-area:1_/_2] bg-white box-border content-stretch flex flex-col items-start p-px place-self-stretch relative rounded-[12.75px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <CardContent11 />
    </div>
  );
}

function CarwashAdminDashboard34() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#155dfc] text-[21px] top-0 tracking-[-0.3589px] w-[48px]">65%</p>
    </div>
  );
}

function CarwashAdminDashboard35() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Potential Growth</p>
    </div>
  );
}

function CardContent12() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[349.75px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start pb-0 pt-[21px] px-[21px] relative w-[349.75px]">
        <CarwashAdminDashboard34 />
        <CarwashAdminDashboard35 />
      </div>
    </div>
  );
}

function Card16() {
  return (
    <div className="[grid-area:1_/_3] bg-white box-border content-stretch flex flex-col items-start p-px place-self-stretch relative rounded-[12.75px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <CardContent12 />
    </div>
  );
}

function CarwashAdminDashboard36() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#e7000b] text-[21px] text-nowrap top-0 tracking-[-0.3589px] whitespace-pre">3</p>
    </div>
  );
}

function CarwashAdminDashboard37() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Low Traffic Slots</p>
    </div>
  );
}

function CardContent13() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[349.75px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start pb-0 pt-[21px] px-[21px] relative w-[349.75px]">
        <CarwashAdminDashboard36 />
        <CarwashAdminDashboard37 />
      </div>
    </div>
  );
}

function Card17() {
  return (
    <div className="[grid-area:1_/_4] bg-white box-border content-stretch flex flex-col items-start p-px place-self-stretch relative rounded-[12.75px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <CardContent13 />
    </div>
  );
}

function Container85() {
  return (
    <div className="absolute gap-[14px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[86px] left-0 top-[66.5px] w-[1449px]" data-name="Container">
      <Card14 />
      <Card15 />
      <Card16 />
      <Card17 />
    </div>
  );
}

function Icon33() {
  return (
    <div className="absolute left-0 size-[17.5px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p8295a80} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d={svgPaths.p3924400} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
        </g>
      </svg>
    </div>
  );
}

function CardTitle9() {
  return (
    <div className="absolute h-[17.5px] left-[22px] top-[22px] w-[670px]" data-name="CardTitle">
      <Icon33 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-[24.5px] not-italic text-[14px] text-neutral-950 text-nowrap top-[1.75px] tracking-[-0.1504px] whitespace-pre">Lowest Hour Performance</p>
    </div>
  );
}

function Paragraph39() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">6:00 AM - 8:00 AM</p>
    </div>
  );
}

function Paragraph40() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#717182] text-[12.25px] top-0 tracking-[-0.0179px] w-[64px]">3 bookings</p>
    </div>
  );
}

function Container86() {
  return (
    <div className="h-[38.5px] relative shrink-0 w-[126.953px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[38.5px] items-start relative w-[126.953px]">
        <Paragraph39 />
        <Paragraph40 />
      </div>
    </div>
  );
}

function Paragraph41() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[77.38px] not-italic text-[#e7000b] text-[14px] text-right top-0 tracking-[-0.1504px] translate-x-[-100%] w-[35px]">$180</p>
    </div>
  );
}

function Paragraph42() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-[77px] not-italic text-[#717182] text-[12.25px] text-right top-0 tracking-[-0.0179px] translate-x-[-100%] w-[77px]">15% capacity</p>
    </div>
  );
}

function Container87() {
  return (
    <div className="h-[38.5px] relative shrink-0 w-[76.672px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[38.5px] items-start relative w-[76.672px]">
        <Paragraph41 />
        <Paragraph42 />
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="bg-red-50 h-[61.5px] relative rounded-[8.75px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#ffe2e2] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[61.5px] items-center justify-between px-[11.5px] py-px relative w-full">
          <Container86 />
          <Container87 />
        </div>
      </div>
    </div>
  );
}

function Paragraph43() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">2:00 PM - 4:00 PM</p>
    </div>
  );
}

function Paragraph44() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#717182] text-[12.25px] top-0 tracking-[-0.0179px] w-[64px]">5 bookings</p>
    </div>
  );
}

function Container89() {
  return (
    <div className="h-[38.5px] relative shrink-0 w-[125.203px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[38.5px] items-start relative w-[125.203px]">
        <Paragraph43 />
        <Paragraph44 />
      </div>
    </div>
  );
}

function Paragraph45() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[78.44px] not-italic text-[#e7000b] text-[14px] text-right top-0 tracking-[-0.1504px] translate-x-[-100%] w-[36px]">$320</p>
    </div>
  );
}

function Paragraph46() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-[79px] not-italic text-[#717182] text-[12.25px] text-right top-0 tracking-[-0.0179px] translate-x-[-100%] w-[79px]">25% capacity</p>
    </div>
  );
}

function Container90() {
  return (
    <div className="h-[38.5px] relative shrink-0 w-[78.375px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[38.5px] items-start relative w-[78.375px]">
        <Paragraph45 />
        <Paragraph46 />
      </div>
    </div>
  );
}

function Container91() {
  return (
    <div className="bg-red-50 h-[61.5px] relative rounded-[8.75px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#ffe2e2] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[61.5px] items-center justify-between px-[11.5px] py-px relative w-full">
          <Container89 />
          <Container90 />
        </div>
      </div>
    </div>
  );
}

function Paragraph47() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">8:00 PM - 10:00 PM</p>
    </div>
  );
}

function Paragraph48() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#717182] text-[12.25px] top-0 tracking-[-0.0179px] w-[64px]">4 bookings</p>
    </div>
  );
}

function Container92() {
  return (
    <div className="h-[38.5px] relative shrink-0 w-[132.156px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[38.5px] items-start relative w-[132.156px]">
        <Paragraph47 />
        <Paragraph48 />
      </div>
    </div>
  );
}

function Paragraph49() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[79.47px] not-italic text-[#e7000b] text-[14px] text-right top-0 tracking-[-0.1504px] translate-x-[-100%] w-[37px]">$240</p>
    </div>
  );
}

function Paragraph50() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-[79px] not-italic text-[#717182] text-[12.25px] text-right top-0 tracking-[-0.0179px] translate-x-[-100%] w-[79px]">20% capacity</p>
    </div>
  );
}

function Container93() {
  return (
    <div className="h-[38.5px] relative shrink-0 w-[78.516px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[38.5px] items-start relative w-[78.516px]">
        <Paragraph49 />
        <Paragraph50 />
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="bg-red-50 h-[61.5px] relative rounded-[8.75px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#ffe2e2] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[61.5px] items-center justify-between px-[11.5px] py-px relative w-full">
          <Container92 />
          <Container93 />
        </div>
      </div>
    </div>
  );
}

function CarwashAdminDashboard38() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] h-[212.5px] items-start relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <Container88 />
      <Container91 />
      <Container94 />
    </div>
  );
}

function Paragraph51() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[#894b00] text-[12.25px] top-0 tracking-[-0.0179px] w-[289px]">📈 Growth Opportunity: $1,850 potential revenue</p>
    </div>
  );
}

function Paragraph52() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#d08700] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Consider targeted campaigns during these low-traffic periods</p>
    </div>
  );
}

function CarwashAdminDashboard39() {
  return (
    <div className="bg-yellow-50 h-[58px] relative rounded-[8.75px] shrink-0 w-full" data-name="CarwashAdminDashboard">
      <div aria-hidden="true" className="absolute border border-[#fff085] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[3.5px] h-[58px] items-start pb-px pt-[11.5px] px-[11.5px] relative w-full">
          <Paragraph51 />
          <Paragraph52 />
        </div>
      </div>
    </div>
  );
}

function CardContent14() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[14px] h-[305.5px] items-start left-px px-[21px] py-0 top-[65.75px] w-[712px]" data-name="CardContent">
      <CarwashAdminDashboard38 />
      <CarwashAdminDashboard39 />
    </div>
  );
}

function Card18() {
  return (
    <div className="[grid-area:1_/_1] bg-white place-self-stretch relative rounded-[12.75px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <CardTitle9 />
      <CardContent14 />
    </div>
  );
}

function Icon34() {
  return (
    <div className="absolute left-0 size-[17.5px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p116d0080} id="Vector" stroke="var(--stroke-0, #D08700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d={svgPaths.p2a6d1550} id="Vector_2" stroke="var(--stroke-0, #D08700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
        </g>
      </svg>
    </div>
  );
}

function CardTitle10() {
  return (
    <div className="absolute h-[17.5px] left-[22px] top-[22px] w-[670px]" data-name="CardTitle">
      <Icon34 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-[24.5px] not-italic text-[14px] text-neutral-950 text-nowrap top-[1.75px] tracking-[-0.1504px] whitespace-pre">Growth Opportunities</p>
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Quietest Days</p>
    </div>
  );
}

function Text29() {
  return (
    <div className="absolute bg-gray-100 h-[21px] left-0 rounded-[3.35544e+07px] top-0 w-[55.906px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-[7px] not-italic text-[#364153] text-[10.5px] text-nowrap top-[3.5px] tracking-[0.0923px] whitespace-pre">Tuesday</p>
    </div>
  );
}

function Text30() {
  return (
    <div className="absolute bg-gray-100 h-[21px] left-[62.91px] rounded-[3.35544e+07px] top-0 w-[72.297px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-[7px] not-italic text-[#364153] text-[10.5px] text-nowrap top-[3.5px] tracking-[0.0923px] whitespace-pre">Wednesday</p>
    </div>
  );
}

function Text31() {
  return (
    <div className="absolute bg-gray-100 h-[21px] left-[142.2px] rounded-[3.35544e+07px] top-0 w-[60.844px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-[7px] not-italic text-[#364153] text-[10.5px] text-nowrap top-[3.5px] tracking-[0.0923px] whitespace-pre">Thursday</p>
    </div>
  );
}

function Container95() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <Text29 />
      <Text30 />
      <Text31 />
    </div>
  );
}

function Container96() {
  return (
    <div className="content-stretch flex flex-col gap-[7px] h-[49px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading6 />
      <Container95 />
    </div>
  );
}

function Paragraph53() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#717182] text-[12.25px] text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Target Campaigns</p>
    </div>
  );
}

function Paragraph54() {
  return (
    <div className="h-[24.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24.5px] left-0 not-italic text-[#d08700] text-[15.75px] text-nowrap top-0 tracking-[-0.2922px] whitespace-pre">{`Early Bird & Off-Peak Discounts`}</p>
    </div>
  );
}

function Paragraph55() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Recommended strategy</p>
    </div>
  );
}

function Container97() {
  return (
    <div className="content-stretch flex flex-col h-[56px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph53 />
      <Paragraph54 />
      <Paragraph55 />
    </div>
  );
}

function CarwashAdminDashboard40() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10.5px] h-[115.5px] items-start left-[17px] top-[21px] w-[674px]" data-name="CarwashAdminDashboard">
      <Container96 />
      <Container97 />
    </div>
  );
}

function Paragraph56() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[#193cb8] text-[12.25px] text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">💡 Optimization Strategy</p>
    </div>
  );
}

function Paragraph57() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#155dfc] text-[10.5px] top-0 tracking-[0.0923px] w-[451px]">Launch promotional campaigns during Tuesday, Wednesday, Thursday to boost utilization</p>
    </div>
  );
}

function CarwashAdminDashboard41() {
  return (
    <div className="absolute bg-blue-50 box-border content-stretch flex flex-col gap-[3.5px] h-[58px] items-start left-[21px] pb-px pt-[11.5px] px-[11.5px] rounded-[8.75px] top-[150.5px] w-[670px]" data-name="CarwashAdminDashboard">
      <div aria-hidden="true" className="absolute border border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <Paragraph56 />
      <Paragraph57 />
    </div>
  );
}

function CardContent15() {
  return (
    <div className="absolute h-[229.5px] left-px top-[65.75px] w-[712px]" data-name="CardContent">
      <CarwashAdminDashboard40 />
      <CarwashAdminDashboard41 />
    </div>
  );
}

function Card19() {
  return (
    <div className="[grid-area:1_/_2] bg-white place-self-stretch relative rounded-[12.75px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <CardTitle10 />
      <CardContent15 />
    </div>
  );
}

function Container98() {
  return (
    <div className="absolute gap-[21px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[372.25px] left-0 top-[173.5px] w-[1449px]" data-name="Container">
      <Card18 />
      <Card19 />
    </div>
  );
}

function Container99() {
  return (
    <div className="h-[545.75px] relative shrink-0 w-full" data-name="Container">
      <Container84 />
      <Container85 />
      <Container98 />
    </div>
  );
}

function Container100() {
  return (
    <div className="content-stretch flex flex-col gap-[21px] h-[1106.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container67 />
      <Container68 />
      <Container83 />
      <Container99 />
    </div>
  );
}

function CardTitle11() {
  return (
    <div className="h-[14px] relative shrink-0 w-[1405px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[1405px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Quick Actions</p>
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="absolute h-[21px] left-[15px] top-[15px] w-[665.5px]" data-name="Heading 4">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Edit My Profile</p>
    </div>
  );
}

function Paragraph58() {
  return (
    <div className="absolute h-[17.5px] left-[15px] top-[43px] w-[665.5px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#717182] text-[12.25px] text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Update center information and settings</p>
    </div>
  );
}

function Button13() {
  return (
    <div className="absolute bg-[#030213] h-[28px] left-[15px] rounded-[6.75px] top-[67.5px] w-[106.281px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-[54px] not-italic text-[12.25px] text-center text-nowrap text-white top-[5.25px] tracking-[-0.0179px] translate-x-[-50%] whitespace-pre">Edit My Profile</p>
    </div>
  );
}

function Container101() {
  return (
    <div className="[grid-area:1_/_1] place-self-stretch relative rounded-[8.75px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <Heading7 />
      <Paragraph58 />
      <Button13 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="absolute h-[21px] left-[15px] top-[15px] w-[665.5px]" data-name="Heading 4">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Manage Branches</p>
    </div>
  );
}

function Paragraph59() {
  return (
    <div className="absolute h-[17.5px] left-[15px] top-[43px] w-[665.5px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#717182] text-[12.25px] text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Create and manage all your branches</p>
    </div>
  );
}

function Button14() {
  return (
    <div className="absolute bg-[#eceef2] h-[28px] left-[15px] rounded-[6.75px] top-[67.5px] w-[126.156px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-[63.5px] not-italic text-[#030213] text-[12.25px] text-center text-nowrap top-[5.25px] tracking-[-0.0179px] translate-x-[-50%] whitespace-pre">Manage Branches</p>
    </div>
  );
}

function Container102() {
  return (
    <div className="[grid-area:1_/_2] place-self-stretch relative rounded-[8.75px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <Heading8 />
      <Paragraph59 />
      <Button14 />
    </div>
  );
}

function Heading9() {
  return (
    <div className="absolute h-[21px] left-[15px] top-[15px] w-[665.5px]" data-name="Heading 4">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Manage Services</p>
    </div>
  );
}

function Paragraph60() {
  return (
    <div className="absolute h-[17.5px] left-[15px] top-[43px] w-[665.5px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#717182] text-[12.25px] text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Configure services and packages</p>
    </div>
  );
}

function Button15() {
  return (
    <div className="absolute bg-[#eceef2] h-[28px] left-[15px] rounded-[6.75px] top-[67.5px] w-[121.531px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-[61px] not-italic text-[#030213] text-[12.25px] text-center text-nowrap top-[5.25px] tracking-[-0.0179px] translate-x-[-50%] whitespace-pre">Manage Services</p>
    </div>
  );
}

function Container103() {
  return (
    <div className="[grid-area:2_/_1] place-self-stretch relative rounded-[8.75px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <Heading9 />
      <Paragraph60 />
      <Button15 />
    </div>
  );
}

function Heading10() {
  return (
    <div className="absolute h-[21px] left-[15px] top-[15px] w-[665.5px]" data-name="Heading 4">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Create Campaign</p>
    </div>
  );
}

function Paragraph61() {
  return (
    <div className="absolute h-[17.5px] left-[15px] top-[43px] w-[665.5px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#717182] text-[12.25px] text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Launch new promotional campaigns</p>
    </div>
  );
}

function Button16() {
  return (
    <div className="absolute bg-[#eceef2] h-[28px] left-[15px] rounded-[6.75px] top-[67.5px] w-[122.766px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-[61.5px] not-italic text-[#030213] text-[12.25px] text-center text-nowrap top-[5.25px] tracking-[-0.0179px] translate-x-[-50%] whitespace-pre">Create Campaign</p>
    </div>
  );
}

function Container104() {
  return (
    <div className="[grid-area:2_/_2] place-self-stretch relative rounded-[8.75px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <Heading10 />
      <Paragraph61 />
      <Button16 />
    </div>
  );
}

function Heading11() {
  return (
    <div className="absolute h-[21px] left-[15px] top-[15px] w-[665.5px]" data-name="Heading 4">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Booking Management</p>
    </div>
  );
}

function Paragraph62() {
  return (
    <div className="absolute h-[17.5px] left-[15px] top-[43px] w-[665.5px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#717182] text-[12.25px] text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Manage customer bookings and calendar</p>
    </div>
  );
}

function Button17() {
  return (
    <div className="absolute bg-[#eceef2] h-[28px] left-[15px] rounded-[6.75px] top-[67.5px] w-[148.703px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-[74.5px] not-italic text-[#030213] text-[12.25px] text-center text-nowrap top-[5.25px] tracking-[-0.0179px] translate-x-[-50%] whitespace-pre">Booking Management</p>
    </div>
  );
}

function Container105() {
  return (
    <div className="[grid-area:3_/_1] place-self-stretch relative rounded-[8.75px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <Heading11 />
      <Paragraph62 />
      <Button17 />
    </div>
  );
}

function Heading12() {
  return (
    <div className="absolute h-[21px] left-[15px] top-[15px] w-[665.5px]" data-name="Heading 4">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Team Management</p>
    </div>
  );
}

function Paragraph63() {
  return (
    <div className="absolute h-[17.5px] left-[15px] top-[43px] w-[665.5px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#717182] text-[12.25px] text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Add and manage carwash admins</p>
    </div>
  );
}

function Button18() {
  return (
    <div className="absolute bg-[#eceef2] h-[28px] left-[15px] rounded-[6.75px] top-[67.5px] w-[132.469px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-[66.5px] not-italic text-[#030213] text-[12.25px] text-center text-nowrap top-[5.25px] tracking-[-0.0179px] translate-x-[-50%] whitespace-pre">Team Management</p>
    </div>
  );
}

function Container106() {
  return (
    <div className="[grid-area:3_/_2] place-self-stretch relative rounded-[8.75px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <Heading12 />
      <Paragraph63 />
      <Button18 />
    </div>
  );
}

function CarwashAdminDashboard42() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1405px]" data-name="CarwashAdminDashboard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border gap-[14px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(3,_minmax(0px,_1fr))] h-full relative w-[1405px]">
        <Container101 />
        <Container102 />
        <Container103 />
        <Container104 />
        <Container105 />
        <Container106 />
      </div>
    </div>
  );
}

function Card20() {
  return (
    <div className="bg-white h-[443.75px] relative rounded-[12.75px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[26.25px] h-[443.75px] items-start pl-[22px] pr-px py-[22px] relative w-full">
          <CardTitle11 />
          <CarwashAdminDashboard42 />
        </div>
      </div>
    </div>
  );
}

function CardTitle12() {
  return (
    <div className="h-[14px] relative shrink-0 w-[1405px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[1405px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Mobile App Preview</p>
      </div>
    </div>
  );
}

function Paragraph64() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[1405px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[702.52px] not-italic text-[#717182] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">See how your carwash center appears to customers in the mobile app</p>
    </div>
  );
}

function Button19() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0)] box-border content-stretch flex gap-[7px] h-[31.5px] items-center justify-center left-[622.56px] px-[15px] py-[8px] rounded-[6.75px] top-[35px] w-[159.875px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] not-italic relative shrink-0 text-[12.25px] text-center text-neutral-950 text-nowrap tracking-[-0.0179px] whitespace-pre">Preview in Mobile App</p>
    </div>
  );
}

function CarwashAdminDashboard43() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1405px]" data-name="CarwashAdminDashboard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full relative w-[1405px]">
        <Paragraph64 />
        <Button19 />
      </div>
    </div>
  );
}

function Card21() {
  return (
    <div className="bg-white h-[150.75px] relative rounded-[12.75px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[26.25px] h-[150.75px] items-start pl-[22px] pr-px py-[22px] relative w-full">
          <CardTitle12 />
          <CarwashAdminDashboard43 />
        </div>
      </div>
    </div>
  );
}

function Container107() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[21px] items-start place-self-stretch relative shrink-0" data-name="Container">
      <Container10 />
      <Card4 />
      <Card5 />
      <Container65 />
      <Container100 />
      <Card20 />
      <Card21 />
    </div>
  );
}

function Icon35() {
  return (
    <div className="relative shrink-0 size-[17.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M5.83333 1.45833V4.375" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d="M11.6667 1.45833V4.375" id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d={svgPaths.p2ef46e0} id="Vector_3" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d="M2.1875 7.29167H15.3125" id="Vector_4" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
        </g>
      </svg>
    </div>
  );
}

function CardTitle13() {
  return (
    <div className="basis-0 grow h-[14px] min-h-px min-w-px relative shrink-0" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">{`Today's Bookings`}</p>
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[137.781px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[7px] h-[17.5px] items-center relative w-[137.781px]">
        <Icon35 />
        <CardTitle13 />
      </div>
    </div>
  );
}

function Icon36() {
  return (
    <div className="absolute left-[67.75px] size-[14px] top-[7px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M2.91667 7H11.0833" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.pf23dd00} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button20() {
  return (
    <div className="h-[28px] relative rounded-[6.75px] shrink-0 w-[90.5px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[90.5px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-[32.25px] not-italic text-[12.25px] text-center text-neutral-950 text-nowrap top-[5.25px] tracking-[-0.0179px] translate-x-[-50%] whitespace-pre">View All</p>
        <Icon36 />
      </div>
    </div>
  );
}

function BookingSummary() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center justify-between left-[22px] top-[22px] w-[336px]" data-name="BookingSummary">
      <Container108 />
      <Button20 />
    </div>
  );
}

function Container109() {
  return (
    <div className="bg-[#2b7fff] h-[7px] relative rounded-[3.35544e+07px] shrink-0 w-[2.641px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[7px] w-[2.641px]" />
    </div>
  );
}

function Text32() {
  return (
    <div className="basis-0 grow h-[14px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Pending</p>
      </div>
    </div>
  );
}

function Container110() {
  return (
    <div className="content-stretch flex gap-[7px] h-[14px] items-center relative shrink-0 w-full" data-name="Container">
      <Container109 />
      <Text32 />
    </div>
  );
}

function Container111() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#1447e6] text-[21px] text-nowrap top-0 tracking-[-0.3589px] whitespace-pre">3</p>
    </div>
  );
}

function Container112() {
  return (
    <div className="[grid-area:1_/_1] bg-blue-50 place-self-stretch relative rounded-[8.75px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[3.5px] items-start pb-px pt-[11.5px] px-[11.5px] relative size-full">
          <Container110 />
          <Container111 />
        </div>
      </div>
    </div>
  );
}

function Container113() {
  return (
    <div className="bg-[#00c950] h-[7px] relative rounded-[3.35544e+07px] shrink-0 w-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[7px] w-0" />
    </div>
  );
}

function Text33() {
  return (
    <div className="h-[14px] relative shrink-0 w-[52.766px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[52.766px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Confirmed</p>
      </div>
    </div>
  );
}

function Container114() {
  return (
    <div className="content-stretch flex gap-[7px] h-[14px] items-center relative shrink-0 w-full" data-name="Container">
      <Container113 />
      <Text33 />
    </div>
  );
}

function Container115() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#008236] text-[21px] text-nowrap top-0 tracking-[-0.3589px] whitespace-pre">8</p>
    </div>
  );
}

function Container116() {
  return (
    <div className="[grid-area:1_/_2] bg-green-50 place-self-stretch relative rounded-[8.75px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#b9f8cf] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[3.5px] items-start pb-px pt-[11.5px] px-[11.5px] relative size-full">
          <Container114 />
          <Container115 />
        </div>
      </div>
    </div>
  );
}

function Container117() {
  return (
    <div className="bg-[#fe9a00] h-[7px] relative rounded-[3.35544e+07px] shrink-0 w-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[7px] w-0" />
    </div>
  );
}

function Text34() {
  return (
    <div className="h-[28px] relative shrink-0 w-[44.594px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[44.594px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] top-0 tracking-[0.0923px] w-[45px]">In Progress</p>
      </div>
    </div>
  );
}

function Container118() {
  return (
    <div className="content-stretch flex gap-[7px] h-[28px] items-center relative shrink-0 w-full" data-name="Container">
      <Container117 />
      <Text34 />
    </div>
  );
}

function Container119() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#bb4d00] text-[21px] text-nowrap top-0 tracking-[-0.3589px] whitespace-pre">3</p>
    </div>
  );
}

function Container120() {
  return (
    <div className="[grid-area:1_/_3] bg-amber-50 place-self-stretch relative rounded-[8.75px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#fee685] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[3.5px] items-start pb-px pt-[11.5px] px-[11.5px] relative size-full">
          <Container118 />
          <Container119 />
        </div>
      </div>
    </div>
  );
}

function Icon37() {
  return (
    <div className="relative size-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0 0">
        <g clipPath="url(#clip0_23244_8356)" id="Icon">
          <path d={svgPaths.p1f023100} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M9 11L12 14L22 4" id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_23244_8356">
            <rect fill="white" height="0" width="0" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text35() {
  return (
    <div className="h-[14px] relative shrink-0 w-[54.938px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[54.938px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Completed</p>
      </div>
    </div>
  );
}

function Container121() {
  return (
    <div className="content-stretch flex gap-[7px] h-[14px] items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex items-center justify-center relative shrink-0 size-0" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none scale-[0%]">
          <Icon37 />
        </div>
      </div>
      <Text35 />
    </div>
  );
}

function Container122() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#008236] text-[21px] text-nowrap top-0 tracking-[-0.3589px] whitespace-pre">1</p>
    </div>
  );
}

function Container123() {
  return (
    <div className="[grid-area:1_/_4] bg-green-50 place-self-stretch relative rounded-[8.75px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#b9f8cf] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[3.5px] items-start pb-px pt-[11.5px] px-[11.5px] relative size-full">
          <Container121 />
          <Container122 />
        </div>
      </div>
    </div>
  );
}

function BookingSummary1() {
  return (
    <div className="gap-[14px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[82.5px] relative shrink-0 w-full" data-name="BookingSummary">
      <Container112 />
      <Container116 />
      <Container120 />
      <Container123 />
    </div>
  );
}

function Paragraph65() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#717182] text-[12.25px] text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">{`Today's Revenue`}</p>
    </div>
  );
}

function Paragraph66() {
  return (
    <div className="h-[31.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[31.5px] left-0 not-italic text-[#8200db] text-[26.25px] top-px tracking-[0.2355px] w-[52px]">$38</p>
    </div>
  );
}

function Container124() {
  return (
    <div className="h-[52.5px] relative shrink-0 w-[97.125px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[3.5px] h-[52.5px] items-start relative w-[97.125px]">
        <Paragraph65 />
        <Paragraph66 />
      </div>
    </div>
  );
}

function Icon38() {
  return (
    <div className="relative shrink-0 size-[21px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
        <g id="Icon">
          <path d="M14 6.125H19.25V11.375" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
          <path d={svgPaths.p1b0ae200} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
        </g>
      </svg>
    </div>
  );
}

function Container125() {
  return (
    <div className="bg-[#9810fa] relative rounded-[3.35544e+07px] shrink-0 size-[42px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[42px]">
        <Icon38 />
      </div>
    </div>
  );
}

function Container126() {
  return (
    <div className="content-stretch flex h-[52.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container124 />
      <Container125 />
    </div>
  );
}

function BookingSummary2() {
  return (
    <div className="h-[82.5px] relative rounded-[8.75px] shrink-0 w-full" data-name="BookingSummary">
      <div aria-hidden="true" className="absolute border border-[#e9d4ff] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[82.5px] items-start pb-px pt-[15px] px-[15px] relative w-full">
          <Container126 />
        </div>
      </div>
    </div>
  );
}

function Icon39() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_23244_8348)" id="Icon">
          <path d="M7 3.5V7L9.33333 8.16667" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.pc012c00} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_23244_8348">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Heading13() {
  return (
    <div className="h-[21px] relative shrink-0 w-[163.984px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[163.984px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Upcoming Appointments</p>
      </div>
    </div>
  );
}

function Container127() {
  return (
    <div className="content-stretch flex gap-[7px] h-[21px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon39 />
      <Heading13 />
    </div>
  );
}

function Icon40() {
  return (
    <div className="relative shrink-0 size-[17.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p1968dd00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d={svgPaths.p20d6b2e0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d={svgPaths.p39d7a960} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d={svgPaths.p31bf6a00} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
        </g>
      </svg>
    </div>
  );
}

function Container128() {
  return (
    <div className="bg-[#00c950] relative rounded-[3.35544e+07px] shrink-0 size-[35px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[35px]">
        <Icon40 />
      </div>
    </div>
  );
}

function Paragraph67() {
  return (
    <div className="h-[21px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Robert Kim</p>
    </div>
  );
}

function Paragraph68() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#717182] text-[12.25px] text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Premium Complete Package</p>
    </div>
  );
}

function Container129() {
  return (
    <div className="basis-0 grow h-[38.5px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[38.5px] items-start relative w-full">
        <Paragraph67 />
        <Paragraph68 />
      </div>
    </div>
  );
}

function Paragraph69() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[62.09px] not-italic text-[14px] text-neutral-950 text-nowrap text-right top-0 tracking-[-0.1504px] translate-x-[-100%] whitespace-pre">08:30</p>
    </div>
  );
}

function Badge8() {
  return (
    <div className="bg-[#00c950] h-[17.5px] overflow-clip relative rounded-[6.75px] shrink-0 w-full" data-name="Badge">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-[55px] not-italic text-[10.5px] text-nowrap text-right text-white top-[1.75px] tracking-[0.0923px] translate-x-[-100%] whitespace-pre">Reserved</p>
    </div>
  );
}

function Container130() {
  return (
    <div className="h-[42px] relative shrink-0 w-[61.984px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[3.25px] h-[42px] items-start relative w-[61.984px]">
        <Paragraph69 />
        <Badge8 />
      </div>
    </div>
  );
}

function Container131() {
  return (
    <div className="bg-[rgba(236,236,240,0.3)] h-[63px] relative rounded-[8.75px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10.5px] h-[63px] items-center px-[10.5px] py-0 relative w-full">
          <Container128 />
          <Container129 />
          <Container130 />
        </div>
      </div>
    </div>
  );
}

function Icon41() {
  return (
    <div className="relative shrink-0 size-[17.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p1968dd00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d={svgPaths.p20d6b2e0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d={svgPaths.p39d7a960} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d={svgPaths.p31bf6a00} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
        </g>
      </svg>
    </div>
  );
}

function Container132() {
  return (
    <div className="bg-[#00c950] relative rounded-[3.35544e+07px] shrink-0 size-[35px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[35px]">
        <Icon41 />
      </div>
    </div>
  );
}

function Paragraph70() {
  return (
    <div className="h-[21px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Jane Smith</p>
    </div>
  );
}

function Paragraph71() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#717182] text-[12.25px] text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Premium Detail</p>
    </div>
  );
}

function Container133() {
  return (
    <div className="basis-0 grow h-[38.5px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[38.5px] items-start relative w-full">
        <Paragraph70 />
        <Paragraph71 />
      </div>
    </div>
  );
}

function Paragraph72() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[62.06px] not-italic text-[14px] text-neutral-950 text-nowrap text-right top-0 tracking-[-0.1504px] translate-x-[-100%] whitespace-pre">09:00</p>
    </div>
  );
}

function Badge9() {
  return (
    <div className="bg-[#00c950] h-[17.5px] overflow-clip relative rounded-[6.75px] shrink-0 w-full" data-name="Badge">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-[55px] not-italic text-[10.5px] text-nowrap text-right text-white top-[1.75px] tracking-[0.0923px] translate-x-[-100%] whitespace-pre">Reserved</p>
    </div>
  );
}

function Container134() {
  return (
    <div className="h-[42px] relative shrink-0 w-[61.984px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[3.25px] h-[42px] items-start relative w-[61.984px]">
        <Paragraph72 />
        <Badge9 />
      </div>
    </div>
  );
}

function Container135() {
  return (
    <div className="bg-[rgba(236,236,240,0.3)] h-[63px] relative rounded-[8.75px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10.5px] h-[63px] items-center px-[10.5px] py-0 relative w-full">
          <Container132 />
          <Container133 />
          <Container134 />
        </div>
      </div>
    </div>
  );
}

function Icon42() {
  return (
    <div className="relative shrink-0 size-[17.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p1968dd00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d={svgPaths.p20d6b2e0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d={svgPaths.p39d7a960} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d={svgPaths.p31bf6a00} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
        </g>
      </svg>
    </div>
  );
}

function Container136() {
  return (
    <div className="bg-[#00c950] relative rounded-[3.35544e+07px] shrink-0 size-[35px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[35px]">
        <Icon42 />
      </div>
    </div>
  );
}

function Paragraph73() {
  return (
    <div className="h-[21px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Sandra Nelson</p>
    </div>
  );
}

function Paragraph74() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#717182] text-[12.25px] text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Premium Complete Package</p>
    </div>
  );
}

function Container137() {
  return (
    <div className="basis-0 grow h-[38.5px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[38.5px] items-start relative w-full">
        <Paragraph73 />
        <Paragraph74 />
      </div>
    </div>
  );
}

function Paragraph75() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[62.47px] not-italic text-[14px] text-neutral-950 text-nowrap text-right top-0 tracking-[-0.1504px] translate-x-[-100%] whitespace-pre">10:00</p>
    </div>
  );
}

function Badge10() {
  return (
    <div className="bg-[#00c950] h-[17.5px] overflow-clip relative rounded-[6.75px] shrink-0 w-full" data-name="Badge">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-[55px] not-italic text-[10.5px] text-nowrap text-right text-white top-[1.75px] tracking-[0.0923px] translate-x-[-100%] whitespace-pre">Reserved</p>
    </div>
  );
}

function Container138() {
  return (
    <div className="h-[42px] relative shrink-0 w-[61.984px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[3.25px] h-[42px] items-start relative w-[61.984px]">
        <Paragraph75 />
        <Badge10 />
      </div>
    </div>
  );
}

function Container139() {
  return (
    <div className="bg-[rgba(236,236,240,0.3)] h-[63px] relative rounded-[8.75px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10.5px] h-[63px] items-center px-[10.5px] py-0 relative w-full">
          <Container136 />
          <Container137 />
          <Container138 />
        </div>
      </div>
    </div>
  );
}

function Container140() {
  return (
    <div className="content-stretch flex flex-col gap-[7px] h-[203px] items-start relative shrink-0 w-full" data-name="Container">
      <Container131 />
      <Container135 />
      <Container139 />
    </div>
  );
}

function BookingSummary3() {
  return (
    <div className="content-stretch flex flex-col gap-[10.5px] h-[234.5px] items-start relative shrink-0 w-full" data-name="BookingSummary">
      <Container127 />
      <Container140 />
    </div>
  );
}

function Icon43() {
  return (
    <div className="relative shrink-0 size-[17.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p13d8b800} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d="M8.75 6.5625V9.47917" id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d="M8.75 12.3958H8.75729" id="Vector_3" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph76() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[#1c398e] text-[14px] text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Action Required</p>
    </div>
  );
}

function Paragraph77() {
  return (
    <div className="h-[35px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#1447e6] text-[12.25px] top-0 tracking-[-0.0179px] w-[183px]">You have 3 bookings waiting for approval</p>
    </div>
  );
}

function Container141() {
  return (
    <div className="basis-0 grow h-[59.5px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[3.5px] h-[59.5px] items-start relative w-full">
        <Paragraph76 />
        <Paragraph77 />
      </div>
    </div>
  );
}

function Button21() {
  return (
    <div className="bg-[rgba(0,0,0,0)] h-[28px] relative rounded-[6.75px] shrink-0 w-[64.719px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[5.25px] h-[28px] items-center justify-center px-[11.5px] py-px relative w-[64.719px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] not-italic relative shrink-0 text-[#1447e6] text-[12.25px] text-center text-nowrap tracking-[-0.0179px] whitespace-pre">Review</p>
      </div>
    </div>
  );
}

function Container142() {
  return (
    <div className="content-stretch flex gap-[10.5px] h-[59.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Icon43 />
      <Container141 />
      <Button21 />
    </div>
  );
}

function BookingSummary4() {
  return (
    <div className="bg-blue-50 h-[89.5px] relative rounded-[8.75px] shrink-0 w-full" data-name="BookingSummary">
      <div aria-hidden="true" className="absolute border border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[89.5px] items-start pb-px pt-[15px] px-[15px] relative w-full">
          <Container142 />
        </div>
      </div>
    </div>
  );
}

function Text36() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[122.375px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[17.5px] relative w-[122.375px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#717182] text-[12.25px] text-nowrap top-0 tracking-[-0.0179px] whitespace-pre">Total Bookings Today</p>
      </div>
    </div>
  );
}

function Text37() {
  return (
    <div className="h-[24.5px] relative shrink-0 w-[18.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24.5px] relative w-[18.25px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24.5px] left-0 not-italic text-[15.75px] text-neutral-950 text-nowrap top-0 tracking-[-0.2922px] whitespace-pre">19</p>
      </div>
    </div>
  );
}

function Container143() {
  return (
    <div className="content-stretch flex h-[24.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text36 />
      <Text37 />
    </div>
  );
}

function BookingSummary5() {
  return (
    <div className="box-border content-stretch flex flex-col h-[39.5px] items-start pb-0 pt-[15px] px-0 relative shrink-0 w-full" data-name="BookingSummary">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <Container143 />
    </div>
  );
}

function CardContent16() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[21px] h-[633.5px] items-start left-px px-[21px] py-0 top-[76.25px] w-[378px]" data-name="CardContent">
      <BookingSummary1 />
      <BookingSummary2 />
      <BookingSummary3 />
      <BookingSummary4 />
      <BookingSummary5 />
    </div>
  );
}

function Card22() {
  return (
    <div className="bg-white h-[710.75px] relative rounded-[12.75px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <BookingSummary />
      <CardContent16 />
    </div>
  );
}

function Icon44() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M4.66667 1.16667V3.5" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M9.33333 1.16667V3.5" id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p24a2b500} id="Vector_3" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M1.75 5.83333H12.25" id="Vector_4" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function CardTitle14() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">{`Today's Schedule`}</p>
      </div>
    </div>
  );
}

function Container144() {
  return (
    <div className="h-[21px] relative shrink-0 w-[134.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[7px] h-[21px] items-center relative w-[134.75px]">
        <Icon44 />
        <CardTitle14 />
      </div>
    </div>
  );
}

function Icon45() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M8.75 10.5L5.25 7L8.75 3.5" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button22() {
  return (
    <div className="relative rounded-[6.75px] shrink-0 size-[24.5px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[24.5px]">
        <Icon45 />
      </div>
    </div>
  );
}

function Icon46() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M5.25 10.5L8.75 7L5.25 3.5" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button23() {
  return (
    <div className="basis-0 grow h-[24.5px] min-h-px min-w-px relative rounded-[6.75px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[24.5px] items-center justify-center relative w-full">
        <Icon46 />
      </div>
    </div>
  );
}

function Container145() {
  return (
    <div className="h-[24.5px] relative shrink-0 w-[52.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[3.5px] h-[24.5px] items-center relative w-[52.5px]">
        <Button22 />
        <Button23 />
      </div>
    </div>
  );
}

function CalendarOverview() {
  return (
    <div className="absolute content-stretch flex h-[24.5px] items-center justify-between left-[21px] top-[21px] w-[336px]" data-name="CalendarOverview">
      <Container144 />
      <Container145 />
    </div>
  );
}

function CalendarOverview1() {
  return (
    <div className="absolute h-[14px] left-[21px] top-[54.25px] w-[336px]" data-name="CalendarOverview">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Today</p>
    </div>
  );
}

function CardHeader4() {
  return (
    <div className="h-[78.75px] relative shrink-0 w-[378px]" data-name="CardHeader">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[78.75px] relative w-[378px]">
        <CalendarOverview />
        <CalendarOverview1 />
      </div>
    </div>
  );
}

function Container146() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[10.5px] text-white top-0 tracking-[0.0923px] w-[125px]">06:30 - Rachel Martinez</p>
    </div>
  );
}

function Container147() {
  return (
    <div className="content-stretch flex h-[14.656px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[14.667px] min-h-px min-w-px not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.9)] tracking-[0.0645px]">Early Bird Express</p>
    </div>
  );
}

function Text38() {
  return (
    <div className="basis-0 grow h-[13.328px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[53px]">🚗 Regular</p>
      </div>
    </div>
  );
}

function Text39() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[4.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[13.328px] items-start relative w-[4.844px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.8)] text-nowrap tracking-[0.1172px] whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Text40() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[37.578px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[37.578px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[38px]">⏱️ 30m</p>
      </div>
    </div>
  );
}

function Text41() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[105.578px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[5.25px] h-[13.328px] items-center relative w-[105.578px]">
        <Text38 />
        <Text39 />
        <Text40 />
      </div>
    </div>
  );
}

function Text42() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[18.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[18.625px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[19px]">$14</p>
      </div>
    </div>
  );
}

function Container148() {
  return (
    <div className="content-stretch flex h-[13.328px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text41 />
      <Text42 />
    </div>
  );
}

function Container149() {
  return (
    <div className="bg-[#f0b100] h-[61.234px] relative rounded-[3.5px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[1.75px] h-[61.234px] items-start pb-0 pt-[7px] px-[7px] relative w-full">
          <Container146 />
          <Container147 />
          <Container148 />
        </div>
      </div>
    </div>
  );
}

function Container150() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[10.5px] text-white top-0 tracking-[0.0923px] w-[109px]">07:30 - George Scott</p>
    </div>
  );
}

function Container151() {
  return (
    <div className="content-stretch flex h-[14.656px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[14.667px] min-h-px min-w-px not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.9)] tracking-[0.0645px]">Early Bird Express</p>
    </div>
  );
}

function Text43() {
  return (
    <div className="basis-0 grow h-[13.328px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[53px]">🚗 Regular</p>
      </div>
    </div>
  );
}

function Text44() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[4.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[13.328px] items-start relative w-[4.844px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.8)] text-nowrap tracking-[0.1172px] whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Text45() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[37.578px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[37.578px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[38px]">⏱️ 30m</p>
      </div>
    </div>
  );
}

function Text46() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[105.578px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[5.25px] h-[13.328px] items-center relative w-[105.578px]">
        <Text43 />
        <Text44 />
        <Text45 />
      </div>
    </div>
  );
}

function Text47() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[18.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[18.625px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[19px]">$14</p>
      </div>
    </div>
  );
}

function Container152() {
  return (
    <div className="content-stretch flex h-[13.328px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text46 />
      <Text47 />
    </div>
  );
}

function Container153() {
  return (
    <div className="bg-[#f0b100] h-[61.234px] relative rounded-[3.5px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[1.75px] h-[61.234px] items-start pb-0 pt-[7px] px-[7px] relative w-full">
          <Container150 />
          <Container151 />
          <Container152 />
        </div>
      </div>
    </div>
  );
}

function Container154() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[10.5px] text-white top-0 tracking-[0.0923px] w-[100px]">08:30 - Robert Kim</p>
    </div>
  );
}

function Container155() {
  return (
    <div className="content-stretch flex h-[14.656px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[14.667px] min-h-px min-w-px not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.9)] tracking-[0.0645px]">Premium Complete Package</p>
    </div>
  );
}

function Text48() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[36.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[36.781px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[37px]">🚗 SUV</p>
      </div>
    </div>
  );
}

function Text49() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[4.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[13.328px] items-start relative w-[4.844px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.8)] text-nowrap tracking-[0.1172px] whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Text50() {
  return (
    <div className="basis-0 grow h-[13.328px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[37px]">⏱️ 75m</p>
      </div>
    </div>
  );
}

function Text51() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[88.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[5.25px] h-[13.328px] items-center relative w-[88.906px]">
        <Text48 />
        <Text49 />
        <Text50 />
      </div>
    </div>
  );
}

function Text52() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[19.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[19.406px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[20px]">$70</p>
      </div>
    </div>
  );
}

function Container156() {
  return (
    <div className="content-stretch flex h-[13.328px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text51 />
      <Text52 />
    </div>
  );
}

function Container157() {
  return (
    <div className="bg-[#2b7fff] h-[61.234px] relative rounded-[3.5px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[1.75px] h-[61.234px] items-start pb-0 pt-[7px] px-[7px] relative w-full">
          <Container154 />
          <Container155 />
          <Container156 />
        </div>
      </div>
    </div>
  );
}

function Container158() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[10.5px] text-white top-0 tracking-[0.0923px] w-[100px]">09:00 - Jane Smith</p>
    </div>
  );
}

function Container159() {
  return (
    <div className="content-stretch flex h-[14.656px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[14.667px] min-h-px min-w-px not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.9)] tracking-[0.0645px]">Premium Detail</p>
    </div>
  );
}

function Text53() {
  return (
    <div className="basis-0 grow h-[13.328px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[47px]">🚗 Sedan</p>
      </div>
    </div>
  );
}

function Text54() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[4.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[13.328px] items-start relative w-[4.844px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.8)] text-nowrap tracking-[0.1172px] whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Text55() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[37.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[37.672px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[38px]">⏱️ 90m</p>
      </div>
    </div>
  );
}

function Text56() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[99.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[5.25px] h-[13.328px] items-center relative w-[99.125px]">
        <Text53 />
        <Text54 />
        <Text55 />
      </div>
    </div>
  );
}

function Text57() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[20.188px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[20.188px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[21px]">$85</p>
      </div>
    </div>
  );
}

function Container160() {
  return (
    <div className="content-stretch flex h-[13.328px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text56 />
      <Text57 />
    </div>
  );
}

function Container161() {
  return (
    <div className="bg-[#2b7fff] h-[61.234px] relative rounded-[3.5px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[1.75px] h-[61.234px] items-start pb-0 pt-[7px] px-[7px] relative w-full">
          <Container158 />
          <Container159 />
          <Container160 />
        </div>
      </div>
    </div>
  );
}

function Container162() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[10.5px] text-white top-0 tracking-[0.0923px] w-[115px]">10:00 - Sandra Nelson</p>
    </div>
  );
}

function Container163() {
  return (
    <div className="content-stretch flex h-[14.656px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[14.667px] min-h-px min-w-px not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.9)] tracking-[0.0645px]">Premium Complete Package</p>
    </div>
  );
}

function Text58() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[36.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[36.781px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[37px]">🚗 SUV</p>
      </div>
    </div>
  );
}

function Text59() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[4.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[13.328px] items-start relative w-[4.844px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.8)] text-nowrap tracking-[0.1172px] whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Text60() {
  return (
    <div className="basis-0 grow h-[13.328px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[38px]">⏱️ 85m</p>
      </div>
    </div>
  );
}

function Text61() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[89.703px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[5.25px] h-[13.328px] items-center relative w-[89.703px]">
        <Text58 />
        <Text59 />
        <Text60 />
      </div>
    </div>
  );
}

function Text62() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[19.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[19.406px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[20px]">$70</p>
      </div>
    </div>
  );
}

function Container164() {
  return (
    <div className="content-stretch flex h-[13.328px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text61 />
      <Text62 />
    </div>
  );
}

function Container165() {
  return (
    <div className="bg-[#2b7fff] h-[61.234px] relative rounded-[3.5px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[1.75px] h-[61.234px] items-start pb-0 pt-[7px] px-[7px] relative w-full">
          <Container162 />
          <Container163 />
          <Container164 />
        </div>
      </div>
    </div>
  );
}

function Container166() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[10.5px] text-white top-0 tracking-[0.0923px] w-[111px]">10:30 - Mike Johnson</p>
    </div>
  );
}

function Container167() {
  return (
    <div className="content-stretch flex h-[14.656px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[14.667px] min-h-px min-w-px not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.9)] tracking-[0.0645px]">Interior Clean</p>
    </div>
  );
}

function Text63() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[36.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[36.781px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[37px]">🚗 SUV</p>
      </div>
    </div>
  );
}

function Text64() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[4.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[13.328px] items-start relative w-[4.844px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.8)] text-nowrap tracking-[0.1172px] whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Text65() {
  return (
    <div className="basis-0 grow h-[13.328px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[38px]">⏱️ 45m</p>
      </div>
    </div>
  );
}

function Text66() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[89.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[5.25px] h-[13.328px] items-center relative w-[89.75px]">
        <Text63 />
        <Text64 />
        <Text65 />
      </div>
    </div>
  );
}

function Text67() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[19.734px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[19.734px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[20px]">$25</p>
      </div>
    </div>
  );
}

function Container168() {
  return (
    <div className="content-stretch flex h-[13.328px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text66 />
      <Text67 />
    </div>
  );
}

function Container169() {
  return (
    <div className="bg-[#2b7fff] h-[61.234px] relative rounded-[3.5px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[1.75px] h-[61.234px] items-start pb-0 pt-[7px] px-[7px] relative w-full">
          <Container166 />
          <Container167 />
          <Container168 />
        </div>
      </div>
    </div>
  );
}

function Container170() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[10.5px] text-white top-0 tracking-[0.0923px] w-[98px]">11:00 - Emily Davis</p>
    </div>
  );
}

function Container171() {
  return (
    <div className="content-stretch flex h-[14.656px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[14.667px] min-h-px min-w-px not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.9)] tracking-[0.0645px]">Premium Deluxe</p>
    </div>
  );
}

function Text68() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[36.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[36.781px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[37px]">🚗 SUV</p>
      </div>
    </div>
  );
}

function Text69() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[4.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[13.328px] items-start relative w-[4.844px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.8)] text-nowrap tracking-[0.1172px] whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Text70() {
  return (
    <div className="basis-0 grow h-[13.328px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[38px]">⏱️ 90m</p>
      </div>
    </div>
  );
}

function Text71() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[89.797px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[5.25px] h-[13.328px] items-center relative w-[89.797px]">
        <Text68 />
        <Text69 />
        <Text70 />
      </div>
    </div>
  );
}

function Text72() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[20.156px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[20.156px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[21px]">$45</p>
      </div>
    </div>
  );
}

function Container172() {
  return (
    <div className="content-stretch flex h-[13.328px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text71 />
      <Text72 />
    </div>
  );
}

function Container173() {
  return (
    <div className="bg-[#f0b100] h-[61.234px] relative rounded-[3.5px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[1.75px] h-[61.234px] items-start pb-0 pt-[7px] px-[7px] relative w-full">
          <Container170 />
          <Container171 />
          <Container172 />
        </div>
      </div>
    </div>
  );
}

function Container174() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[10.5px] text-white top-0 tracking-[0.0923px] w-[103px]">11:30 - Maria Garcia</p>
    </div>
  );
}

function Container175() {
  return (
    <div className="content-stretch flex h-[14.656px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[14.667px] min-h-px min-w-px not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.9)] tracking-[0.0645px]">Express Wash</p>
    </div>
  );
}

function Text73() {
  return (
    <div className="basis-0 grow h-[13.328px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[53px]">🚗 Regular</p>
      </div>
    </div>
  );
}

function Text74() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[4.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[13.328px] items-start relative w-[4.844px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.8)] text-nowrap tracking-[0.1172px] whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Text75() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[37.578px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[37.578px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[38px]">⏱️ 30m</p>
      </div>
    </div>
  );
}

function Text76() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[105.578px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[5.25px] h-[13.328px] items-center relative w-[105.578px]">
        <Text73 />
        <Text74 />
        <Text75 />
      </div>
    </div>
  );
}

function Text77() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[19.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[19.906px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[20px]">$20</p>
      </div>
    </div>
  );
}

function Container176() {
  return (
    <div className="content-stretch flex h-[13.328px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text76 />
      <Text77 />
    </div>
  );
}

function Container177() {
  return (
    <div className="bg-[#2b7fff] h-[61.234px] relative rounded-[3.5px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[1.75px] h-[61.234px] items-start pb-0 pt-[7px] px-[7px] relative w-full">
          <Container174 />
          <Container175 />
          <Container176 />
        </div>
      </div>
    </div>
  );
}

function Container178() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[10.5px] text-white top-0 tracking-[0.0923px] w-[91px]">12:30 - Lisa Chen</p>
    </div>
  );
}

function Container179() {
  return (
    <div className="content-stretch flex h-[14.656px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[14.667px] min-h-px min-w-px not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.9)] tracking-[0.0645px]">Exterior Wash</p>
    </div>
  );
}

function Text78() {
  return (
    <div className="basis-0 grow h-[13.328px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[47px]">🚗 Sedan</p>
      </div>
    </div>
  );
}

function Text79() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[4.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[13.328px] items-start relative w-[4.844px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.8)] text-nowrap tracking-[0.1172px] whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Text80() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[37.219px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[37.219px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[38px]">⏱️ 25m</p>
      </div>
    </div>
  );
}

function Text81() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[98.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[5.25px] h-[13.328px] items-center relative w-[98.672px]">
        <Text78 />
        <Text79 />
        <Text80 />
      </div>
    </div>
  );
}

function Text82() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[18.656px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[18.656px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[19px]">$18</p>
      </div>
    </div>
  );
}

function Container180() {
  return (
    <div className="content-stretch flex h-[13.328px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text81 />
      <Text82 />
    </div>
  );
}

function Container181() {
  return (
    <div className="bg-[#f0b100] h-[61.234px] relative rounded-[3.5px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[1.75px] h-[61.234px] items-start pb-0 pt-[7px] px-[7px] relative w-full">
          <Container178 />
          <Container179 />
          <Container180 />
        </div>
      </div>
    </div>
  );
}

function Container182() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[10.5px] text-white top-0 tracking-[0.0923px] w-[107px]">13:00 - David Wilson</p>
    </div>
  );
}

function Container183() {
  return (
    <div className="content-stretch flex h-[14.656px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[14.667px] min-h-px min-w-px not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.9)] tracking-[0.0645px]">Basic Wash</p>
    </div>
  );
}

function Text83() {
  return (
    <div className="basis-0 grow h-[13.328px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[43px]">🚗 Truck</p>
      </div>
    </div>
  );
}

function Text84() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[4.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[13.328px] items-start relative w-[4.844px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.8)] text-nowrap tracking-[0.1172px] whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Text85() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[37.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[37.672px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[38px]">⏱️ 60m</p>
      </div>
    </div>
  );
}

function Text86() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[95.828px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[5.25px] h-[13.328px] items-center relative w-[95.828px]">
        <Text83 />
        <Text84 />
        <Text85 />
      </div>
    </div>
  );
}

function Text87() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[19.797px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[19.797px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[20px]">$32</p>
      </div>
    </div>
  );
}

function Container184() {
  return (
    <div className="content-stretch flex h-[13.328px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text86 />
      <Text87 />
    </div>
  );
}

function Container185() {
  return (
    <div className="bg-[#f0b100] h-[61.234px] relative rounded-[3.5px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[1.75px] h-[61.234px] items-start pb-0 pt-[7px] px-[7px] relative w-full">
          <Container182 />
          <Container183 />
          <Container184 />
        </div>
      </div>
    </div>
  );
}

function Container186() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[10.5px] text-white top-0 tracking-[0.0923px] w-[129px]">13:30 - James Rodriguez</p>
    </div>
  );
}

function Container187() {
  return (
    <div className="content-stretch flex h-[14.656px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[14.667px] min-h-px min-w-px not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.9)] tracking-[0.0645px]">Interior Cleaning</p>
    </div>
  );
}

function Text88() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[33.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[33.906px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[34px]">🚗 Van</p>
      </div>
    </div>
  );
}

function Text89() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[4.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[13.328px] items-start relative w-[4.844px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.8)] text-nowrap tracking-[0.1172px] whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Text90() {
  return (
    <div className="basis-0 grow h-[13.328px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[38px]">⏱️ 35m</p>
      </div>
    </div>
  );
}

function Text91() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[86.703px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[5.25px] h-[13.328px] items-center relative w-[86.703px]">
        <Text88 />
        <Text89 />
        <Text90 />
      </div>
    </div>
  );
}

function Text92() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[20px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[20px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[20px]">$28</p>
      </div>
    </div>
  );
}

function Container188() {
  return (
    <div className="content-stretch flex h-[13.328px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text91 />
      <Text92 />
    </div>
  );
}

function Container189() {
  return (
    <div className="bg-[#ff6900] h-[61.234px] relative rounded-[3.5px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[1.75px] h-[61.234px] items-start pb-0 pt-[7px] px-[7px] relative w-full">
          <Container186 />
          <Container187 />
          <Container188 />
        </div>
      </div>
    </div>
  );
}

function Container190() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[10.5px] text-white top-0 tracking-[0.0923px] w-[111px]">14:00 - Sarah Connor</p>
    </div>
  );
}

function Container191() {
  return (
    <div className="content-stretch flex h-[14.656px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[14.667px] min-h-px min-w-px not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.9)] tracking-[0.0645px]">Full Service</p>
    </div>
  );
}

function Text93() {
  return (
    <div className="basis-0 grow h-[13.328px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[53px]">🚗 Regular</p>
      </div>
    </div>
  );
}

function Text94() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[4.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[13.328px] items-start relative w-[4.844px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.8)] text-nowrap tracking-[0.1172px] whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Text95() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[36.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[36.781px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[37px]">⏱️ 75m</p>
      </div>
    </div>
  );
}

function Text96() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[104.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[5.25px] h-[13.328px] items-center relative w-[104.781px]">
        <Text93 />
        <Text94 />
        <Text95 />
      </div>
    </div>
  );
}

function Text97() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[19.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[19.906px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[20px]">$55</p>
      </div>
    </div>
  );
}

function Container192() {
  return (
    <div className="content-stretch flex h-[13.328px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text96 />
      <Text97 />
    </div>
  );
}

function Container193() {
  return (
    <div className="bg-[#ff6900] h-[61.234px] relative rounded-[3.5px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[1.75px] h-[61.234px] items-start pb-0 pt-[7px] px-[7px] relative w-full">
          <Container190 />
          <Container191 />
          <Container192 />
        </div>
      </div>
    </div>
  );
}

function Container194() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[10.5px] text-white top-0 tracking-[0.0923px] w-[103px]">14:00 - Larry Carter</p>
    </div>
  );
}

function Container195() {
  return (
    <div className="content-stretch flex h-[14.656px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[14.667px] min-h-px min-w-px not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.9)] tracking-[0.0645px]">Exterior Wash</p>
    </div>
  );
}

function Text98() {
  return (
    <div className="basis-0 grow h-[13.328px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[53px]">🚗 Regular</p>
      </div>
    </div>
  );
}

function Text99() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[4.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[13.328px] items-start relative w-[4.844px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.8)] text-nowrap tracking-[0.1172px] whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Text100() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[37.219px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[37.219px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[38px]">⏱️ 25m</p>
      </div>
    </div>
  );
}

function Text101() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[105.219px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[5.25px] h-[13.328px] items-center relative w-[105.219px]">
        <Text98 />
        <Text99 />
        <Text100 />
      </div>
    </div>
  );
}

function Text102() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[18.656px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[18.656px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[19px]">$18</p>
      </div>
    </div>
  );
}

function Container196() {
  return (
    <div className="content-stretch flex h-[13.328px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text101 />
      <Text102 />
    </div>
  );
}

function Container197() {
  return (
    <div className="bg-[#ff6900] h-[61.234px] relative rounded-[3.5px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[1.75px] h-[61.234px] items-start pb-0 pt-[7px] px-[7px] relative w-full">
          <Container194 />
          <Container195 />
          <Container196 />
        </div>
      </div>
    </div>
  );
}

function Container198() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[10.5px] text-white top-0 tracking-[0.0923px] w-[115px]">14:30 - Tom Anderson</p>
    </div>
  );
}

function Container199() {
  return (
    <div className="content-stretch flex h-[14.656px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[14.667px] min-h-px min-w-px not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.9)] tracking-[0.0645px]">Premium Detail</p>
    </div>
  );
}

function Text103() {
  return (
    <div className="basis-0 grow h-[13.328px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[47px]">🚗 Sedan</p>
      </div>
    </div>
  );
}

function Text104() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[4.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[13.328px] items-start relative w-[4.844px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.8)] text-nowrap tracking-[0.1172px] whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Text105() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[37.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[37.672px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[38px]">⏱️ 90m</p>
      </div>
    </div>
  );
}

function Text106() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[99.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[5.25px] h-[13.328px] items-center relative w-[99.125px]">
        <Text103 />
        <Text104 />
        <Text105 />
      </div>
    </div>
  );
}

function Text107() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[20.188px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[20.188px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[21px]">$85</p>
      </div>
    </div>
  );
}

function Container200() {
  return (
    <div className="content-stretch flex h-[13.328px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text106 />
      <Text107 />
    </div>
  );
}

function Container201() {
  return (
    <div className="bg-violet-500 h-[61.234px] relative rounded-[3.5px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[1.75px] h-[61.234px] items-start pb-0 pt-[7px] px-[7px] relative w-full">
          <Container198 />
          <Container199 />
          <Container200 />
        </div>
      </div>
    </div>
  );
}

function Container202() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[10.5px] text-white top-0 tracking-[0.0923px] w-[117px]">15:00 - Kevin Martinez</p>
    </div>
  );
}

function Container203() {
  return (
    <div className="content-stretch flex h-[14.656px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[14.667px] min-h-px min-w-px not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.9)] tracking-[0.0645px]">Express Wash</p>
    </div>
  );
}

function Text108() {
  return (
    <div className="basis-0 grow h-[13.328px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[53px]">🚗 Regular</p>
      </div>
    </div>
  );
}

function Text109() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[4.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[13.328px] items-start relative w-[4.844px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.8)] text-nowrap tracking-[0.1172px] whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Text110() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[37.578px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[37.578px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[38px]">⏱️ 30m</p>
      </div>
    </div>
  );
}

function Text111() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[105.578px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[5.25px] h-[13.328px] items-center relative w-[105.578px]">
        <Text108 />
        <Text109 />
        <Text110 />
      </div>
    </div>
  );
}

function Text112() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[19.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[19.906px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[20px]">$20</p>
      </div>
    </div>
  );
}

function Container204() {
  return (
    <div className="content-stretch flex h-[13.328px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text111 />
      <Text112 />
    </div>
  );
}

function Container205() {
  return (
    <div className="bg-[#2b7fff] h-[61.234px] relative rounded-[3.5px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[1.75px] h-[61.234px] items-start pb-0 pt-[7px] px-[7px] relative w-full">
          <Container202 />
          <Container203 />
          <Container204 />
        </div>
      </div>
    </div>
  );
}

function Container206() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[10.5px] text-white top-0 tracking-[0.0923px] w-[109px]">16:30 - Rachel Green</p>
    </div>
  );
}

function Container207() {
  return (
    <div className="content-stretch flex h-[14.656px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[14.667px] min-h-px min-w-px not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.9)] tracking-[0.0645px]">Interior + Exterior</p>
    </div>
  );
}

function Text113() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[36.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[36.781px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[37px]">🚗 SUV</p>
      </div>
    </div>
  );
}

function Text114() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[4.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[13.328px] items-start relative w-[4.844px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.8)] text-nowrap tracking-[0.1172px] whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Text115() {
  return (
    <div className="basis-0 grow h-[13.328px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[38px]">⏱️ 60m</p>
      </div>
    </div>
  );
}

function Text116() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[89.797px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[5.25px] h-[13.328px] items-center relative w-[89.797px]">
        <Text113 />
        <Text114 />
        <Text115 />
      </div>
    </div>
  );
}

function Text117() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[20.156px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[20.156px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[21px]">$45</p>
      </div>
    </div>
  );
}

function Container208() {
  return (
    <div className="content-stretch flex h-[13.328px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text116 />
      <Text117 />
    </div>
  );
}

function Container209() {
  return (
    <div className="bg-[#fb2c36] h-[61.234px] relative rounded-[3.5px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[1.75px] h-[61.234px] items-start pb-0 pt-[7px] px-[7px] relative w-full">
          <Container206 />
          <Container207 />
          <Container208 />
        </div>
      </div>
    </div>
  );
}

function Container210() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[10.5px] text-white top-0 tracking-[0.0923px] w-[99px]">17:00 - Tom Wilson</p>
    </div>
  );
}

function Container211() {
  return (
    <div className="content-stretch flex h-[14.656px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[14.667px] min-h-px min-w-px not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.9)] tracking-[0.0645px]">Premium Wax Application</p>
    </div>
  );
}

function Text118() {
  return (
    <div className="basis-0 grow h-[13.328px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[47px]">🚗 Sedan</p>
      </div>
    </div>
  );
}

function Text119() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[4.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[13.328px] items-start relative w-[4.844px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.8)] text-nowrap tracking-[0.1172px] whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Text120() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[37.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[37.453px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[38px]">⏱️ 35m</p>
      </div>
    </div>
  );
}

function Text121() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[98.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[5.25px] h-[13.328px] items-center relative w-[98.906px]">
        <Text118 />
        <Text119 />
        <Text120 />
      </div>
    </div>
  );
}

function Text122() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[20.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[20.25px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[21px]">$38</p>
      </div>
    </div>
  );
}

function Container212() {
  return (
    <div className="content-stretch flex h-[13.328px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text121 />
      <Text122 />
    </div>
  );
}

function Container213() {
  return (
    <div className="bg-[#00c950] h-[61.234px] relative rounded-[3.5px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[1.75px] h-[61.234px] items-start pb-0 pt-[7px] px-[7px] relative w-full">
          <Container210 />
          <Container211 />
          <Container212 />
        </div>
      </div>
    </div>
  );
}

function Container214() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[10.5px] text-white top-0 tracking-[0.0923px] w-[111px]">18:00 - Nancy Adams</p>
    </div>
  );
}

function Container215() {
  return (
    <div className="content-stretch flex h-[14.656px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[14.667px] min-h-px min-w-px not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.9)] tracking-[0.0645px]">{`Tire Shine & Treatment`}</p>
    </div>
  );
}

function Text123() {
  return (
    <div className="basis-0 grow h-[13.328px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[43px]">🚗 Truck</p>
      </div>
    </div>
  );
}

function Text124() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[4.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[13.328px] items-start relative w-[4.844px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.8)] text-nowrap tracking-[0.1172px] whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Text125() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[35.828px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[35.828px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[36px]">⏱️ 15m</p>
      </div>
    </div>
  );
}

function Text126() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[93.984px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[5.25px] h-[13.328px] items-center relative w-[93.984px]">
        <Text123 />
        <Text124 />
        <Text125 />
      </div>
    </div>
  );
}

function Text127() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[18.656px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[18.656px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[19px]">$18</p>
      </div>
    </div>
  );
}

function Container216() {
  return (
    <div className="content-stretch flex h-[13.328px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text126 />
      <Text127 />
    </div>
  );
}

function Container217() {
  return (
    <div className="bg-[#2b7fff] h-[61.234px] relative rounded-[3.5px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[1.75px] h-[61.234px] items-start pb-0 pt-[7px] px-[7px] relative w-full">
          <Container214 />
          <Container215 />
          <Container216 />
        </div>
      </div>
    </div>
  );
}

function Container218() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[10.5px] text-white top-0 tracking-[0.0923px] w-[102px]">19:00 - Frank Baker</p>
    </div>
  );
}

function Container219() {
  return (
    <div className="content-stretch flex h-[14.656px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[14.667px] min-h-px min-w-px not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.9)] tracking-[0.0645px]">Express Wash</p>
    </div>
  );
}

function Text128() {
  return (
    <div className="basis-0 grow h-[13.328px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[47px]">🚗 Sedan</p>
      </div>
    </div>
  );
}

function Text129() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[4.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[13.328px] items-start relative w-[4.844px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.8)] text-nowrap tracking-[0.1172px] whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Text130() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[37.578px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[37.578px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[38px]">⏱️ 30m</p>
      </div>
    </div>
  );
}

function Text131() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[99.031px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[5.25px] h-[13.328px] items-center relative w-[99.031px]">
        <Text128 />
        <Text129 />
        <Text130 />
      </div>
    </div>
  );
}

function Text132() {
  return (
    <div className="h-[13.328px] relative shrink-0 w-[19.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.328px] relative w-[19.906px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.333px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.8)] top-0 tracking-[0.1172px] w-[20px]">$20</p>
      </div>
    </div>
  );
}

function Container220() {
  return (
    <div className="content-stretch flex h-[13.328px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text131 />
      <Text132 />
    </div>
  );
}

function Container221() {
  return (
    <div className="bg-[#2b7fff] h-[61.234px] relative rounded-[3.5px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[1.75px] h-[61.234px] items-start pb-0 pt-[7px] px-[7px] relative w-full">
          <Container218 />
          <Container219 />
          <Container220 />
        </div>
      </div>
    </div>
  );
}

function CalendarOverview2() {
  return (
    <div className="h-[450px] relative shrink-0 w-full" data-name="CalendarOverview">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[5.25px] h-[450px] items-start pl-0 pr-[18.5px] py-0 relative w-full">
          <Container149 />
          <Container153 />
          <Container157 />
          <Container161 />
          <Container165 />
          <Container169 />
          <Container173 />
          <Container177 />
          <Container181 />
          <Container185 />
          <Container189 />
          <Container193 />
          <Container197 />
          <Container201 />
          <Container205 />
          <Container209 />
          <Container213 />
          <Container217 />
          <Container221 />
        </div>
      </div>
    </div>
  );
}

function Container222() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[14px] left-[75.45px] not-italic text-[#1c398e] text-[10.5px] text-center text-nowrap top-0 tracking-[0.0923px] translate-x-[-50%] whitespace-pre">11</p>
    </div>
  );
}

function Container223() {
  return (
    <div className="content-stretch flex h-[13.328px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[13.333px] min-h-px min-w-px not-italic relative shrink-0 text-[#155dfc] text-[10px] text-center tracking-[0.1172px]">Scheduled</p>
    </div>
  );
}

function Container224() {
  return (
    <div className="[grid-area:1_/_1] bg-blue-50 h-[37.828px] justify-self-stretch relative rounded-[3.5px] shrink-0" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[37.828px] items-start pb-0 pt-[5.25px] px-[7px] relative w-full">
          <Container222 />
          <Container223 />
        </div>
      </div>
    </div>
  );
}

function Container225() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[14px] left-[75.27px] not-italic text-[#59168b] text-[10.5px] text-center text-nowrap top-0 tracking-[0.0923px] translate-x-[-50%] whitespace-pre">3</p>
    </div>
  );
}

function Container226() {
  return (
    <div className="content-stretch flex h-[13.328px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[13.333px] min-h-px min-w-px not-italic relative shrink-0 text-[#9810fa] text-[10px] text-center tracking-[0.1172px]">Requests</p>
    </div>
  );
}

function Container227() {
  return (
    <div className="[grid-area:1_/_2] bg-purple-50 h-[37.828px] justify-self-stretch relative rounded-[3.5px] shrink-0" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[37.828px] items-start pb-0 pt-[5.25px] px-[7px] relative w-full">
          <Container225 />
          <Container226 />
        </div>
      </div>
    </div>
  );
}

function Container228() {
  return (
    <div className="gap-[7px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[37.828px] relative shrink-0 w-full" data-name="Container">
      <Container224 />
      <Container227 />
    </div>
  );
}

function CalendarOverview3() {
  return (
    <div className="box-border content-stretch flex flex-col h-[45.828px] items-start pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="CalendarOverview">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <Container228 />
    </div>
  );
}

function Button24() {
  return (
    <div className="bg-[rgba(0,0,0,0)] h-[28px] relative rounded-[6.75px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-[168.08px] not-italic text-[12.25px] text-center text-neutral-950 text-nowrap top-[5.25px] tracking-[-0.0179px] translate-x-[-50%] whitespace-pre">View Full Calendar</p>
    </div>
  );
}

function CardContent17() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[378px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[7px] h-full items-start px-[21px] py-0 relative w-[378px]">
        <CalendarOverview2 />
        <CalendarOverview3 />
        <Button24 />
      </div>
    </div>
  );
}

function Card23() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[21px] h-[664.078px] items-start p-px relative rounded-[12.75px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <CardHeader4 />
      <CardContent17 />
    </div>
  );
}

function Icon47() {
  return (
    <div className="absolute left-0 size-[14px] top-[5.25px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_23244_8321)" id="Icon">
          <path d="M7 10.5V2.91667" id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p3eb6dd00} id="Vector_2" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p3c6a8400} id="Vector_3" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p2efb6000} id="Vector_4" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p1b986a00} id="Vector_5" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p24ca4d80} id="Vector_6" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p3c5b7de0} id="Vector_7" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p14889600} id="Vector_8" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_23244_8321">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Heading14() {
  return (
    <div className="h-[24.5px] relative shrink-0 w-full" data-name="Heading 3">
      <Icon47 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24.5px] left-[21px] not-italic text-[15.75px] text-neutral-950 text-nowrap top-0 tracking-[-0.2922px] whitespace-pre">AI Campaign Suggestions</p>
    </div>
  );
}

function Paragraph78() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Boost low-traffic hours</p>
    </div>
  );
}

function Container229() {
  return (
    <div className="content-stretch flex flex-col h-[38.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading14 />
      <Paragraph78 />
    </div>
  );
}

function Badge11() {
  return (
    <div className="bg-purple-100 h-[19.5px] relative rounded-[6.75px] shrink-0 w-[114.703px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[3.5px] h-[19.5px] items-center justify-center overflow-clip px-[8px] py-[2.75px] relative rounded-[inherit] w-[114.703px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] not-italic relative shrink-0 text-[#8200db] text-[10.5px] text-nowrap tracking-[0.0923px] whitespace-pre">6:00 AM - 8:00 AM</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e9d4ff] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
    </div>
  );
}

function Container230() {
  return (
    <div className="bg-[#00c950] relative rounded-[3.35544e+07px] shrink-0 size-[7px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[7px]" />
    </div>
  );
}

function Text133() {
  return (
    <div className="h-[14px] relative shrink-0 w-[23.031px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[23.031px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] top-0 tracking-[0.0923px] w-[24px]">92%</p>
      </div>
    </div>
  );
}

function CarwashAdminDashboard44() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[7px] h-[19.5px] items-center justify-self-stretch relative shrink-0" data-name="CarwashAdminDashboard">
      <Badge11 />
      <Container230 />
      <Text133 />
    </div>
  );
}

function CardTitle15() {
  return (
    <div className="[grid-area:2_/_1] place-self-stretch relative shrink-0" data-name="CardTitle">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Early Bird Express</p>
    </div>
  );
}

function CardHeader5() {
  return (
    <div className="h-[80.75px] relative shrink-0 w-[378px]" data-name="CardHeader">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border gap-[5.25px] grid grid-cols-[repeat(1,_minmax(0px,_1fr))] grid-rows-[minmax(0px,_23fr)_minmax(0px,_1fr)] h-[80.75px] pb-[10.5px] pt-[21px] px-[21px] relative w-[378px]">
        <CarwashAdminDashboard44 />
        <CardTitle15 />
      </div>
    </div>
  );
}

function Text134() {
  return (
    <div className="h-[14px] relative shrink-0 w-[47.828px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[47.828px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Discount:</p>
      </div>
    </div>
  );
}

function Text135() {
  return (
    <div className="h-[14px] relative shrink-0 w-[48.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[48.344px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[14px] left-0 not-italic text-[10.5px] text-neutral-950 top-0 tracking-[0.0923px] w-[49px]">30% OFF</p>
      </div>
    </div>
  );
}

function Container231() {
  return (
    <div className="content-stretch flex h-[14px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text134 />
      <Text135 />
    </div>
  );
}

function Text136() {
  return (
    <div className="h-[14px] relative shrink-0 w-[89.719px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[89.719px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Booking Increase:</p>
      </div>
    </div>
  );
}

function Text137() {
  return (
    <div className="h-[14px] relative shrink-0 w-[31.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[31.688px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[14px] left-0 not-italic text-[#00a63e] text-[10.5px] top-0 tracking-[0.0923px] w-[32px]">+85%</p>
      </div>
    </div>
  );
}

function Container232() {
  return (
    <div className="content-stretch flex h-[14px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text136 />
      <Text137 />
    </div>
  );
}

function Text138() {
  return (
    <div className="h-[14px] relative shrink-0 w-[68.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[68.25px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Est. Revenue:</p>
      </div>
    </div>
  );
}

function Text139() {
  return (
    <div className="h-[14px] relative shrink-0 w-[28.156px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[28.156px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[14px] left-0 not-italic text-[#00a63e] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">$540</p>
      </div>
    </div>
  );
}

function Container233() {
  return (
    <div className="content-stretch flex h-[14px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text138 />
      <Text139 />
    </div>
  );
}

function CarwashAdminDashboard45() {
  return (
    <div className="content-stretch flex flex-col gap-[7px] h-[56px] items-start relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <Container231 />
      <Container232 />
      <Container233 />
    </div>
  );
}

function Paragraph79() {
  return (
    <div className="h-[84px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#6e11b0] text-[14px] top-0 tracking-[-0.1504px] w-[296px]">Analysis shows early commuters value quick service and are price-sensitive. 30% discount during 6-8 AM will attract busy professionals starting their day.</p>
    </div>
  );
}

function CarwashAdminDashboard46() {
  return (
    <div className="bg-[rgba(243,232,255,0.5)] h-[100px] relative rounded-[3.5px] shrink-0 w-full" data-name="CarwashAdminDashboard">
      <div aria-hidden="true" className="absolute border border-[#e9d4ff] border-solid inset-0 pointer-events-none rounded-[3.5px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[100px] items-start pb-px pt-[8px] px-[8px] relative w-full">
          <Paragraph79 />
        </div>
      </div>
    </div>
  );
}

function Icon48() {
  return (
    <div className="absolute left-[108.44px] size-[14px] top-[7px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_23244_8431)" id="Icon">
          <path d={svgPaths.pc012c00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p1426c1f0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p206e4880} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_23244_8431">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button25() {
  return (
    <div className="bg-[#9810fa] h-[28px] relative rounded-[6.75px] shrink-0 w-full" data-name="Button">
      <Icon48 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-[179.19px] not-italic text-[12.25px] text-center text-nowrap text-white top-[5.25px] tracking-[-0.0179px] translate-x-[-50%] whitespace-pre">Apply Campaign</p>
    </div>
  );
}

function CardContent18() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[378px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[10.5px] h-full items-start px-[21px] py-0 relative w-[378px]">
        <CarwashAdminDashboard45 />
        <CarwashAdminDashboard46 />
        <Button25 />
      </div>
    </div>
  );
}

function Card24() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[21px] h-[329.75px] items-start p-px relative rounded-[12.75px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#e9d4ff] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <CardHeader5 />
      <CardContent18 />
    </div>
  );
}

function Badge12() {
  return (
    <div className="bg-purple-100 h-[19.5px] relative rounded-[6.75px] shrink-0 w-[113.391px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[3.5px] h-[19.5px] items-center justify-center overflow-clip px-[8px] py-[2.75px] relative rounded-[inherit] w-[113.391px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] not-italic relative shrink-0 text-[#8200db] text-[10.5px] text-nowrap tracking-[0.0923px] whitespace-pre">2:00 PM - 4:00 PM</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e9d4ff] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
    </div>
  );
}

function Container234() {
  return (
    <div className="bg-[#00c950] relative rounded-[3.35544e+07px] shrink-0 size-[7px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[7px]" />
    </div>
  );
}

function Text140() {
  return (
    <div className="h-[14px] relative shrink-0 w-[22.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[22.688px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] top-0 tracking-[0.0923px] w-[23px]">87%</p>
      </div>
    </div>
  );
}

function CarwashAdminDashboard47() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[7px] h-[19.5px] items-center justify-self-stretch relative shrink-0" data-name="CarwashAdminDashboard">
      <Badge12 />
      <Container234 />
      <Text140 />
    </div>
  );
}

function CardTitle16() {
  return (
    <div className="[grid-area:2_/_1] place-self-stretch relative shrink-0" data-name="CardTitle">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Afternoon Refresh</p>
    </div>
  );
}

function CardHeader6() {
  return (
    <div className="h-[80.75px] relative shrink-0 w-[378px]" data-name="CardHeader">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border gap-[5.25px] grid grid-cols-[repeat(1,_minmax(0px,_1fr))] grid-rows-[minmax(0px,_23fr)_minmax(0px,_1fr)] h-[80.75px] pb-[10.5px] pt-[21px] px-[21px] relative w-[378px]">
        <CarwashAdminDashboard47 />
        <CardTitle16 />
      </div>
    </div>
  );
}

function Text141() {
  return (
    <div className="h-[14px] relative shrink-0 w-[47.828px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[47.828px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Discount:</p>
      </div>
    </div>
  );
}

function Text142() {
  return (
    <div className="h-[14px] relative shrink-0 w-[46.516px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[46.516px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[14px] left-0 not-italic text-[10.5px] text-neutral-950 top-0 tracking-[0.0923px] w-[47px]">15% OFF</p>
      </div>
    </div>
  );
}

function Container235() {
  return (
    <div className="content-stretch flex h-[14px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text141 />
      <Text142 />
    </div>
  );
}

function Text143() {
  return (
    <div className="h-[14px] relative shrink-0 w-[89.719px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[89.719px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Booking Increase:</p>
      </div>
    </div>
  );
}

function Text144() {
  return (
    <div className="h-[14px] relative shrink-0 w-[31.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[31.609px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[14px] left-0 not-italic text-[#00a63e] text-[10.5px] top-0 tracking-[0.0923px] w-[32px]">+65%</p>
      </div>
    </div>
  );
}

function Container236() {
  return (
    <div className="content-stretch flex h-[14px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text143 />
      <Text144 />
    </div>
  );
}

function Text145() {
  return (
    <div className="h-[14px] relative shrink-0 w-[68.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[68.25px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Est. Revenue:</p>
      </div>
    </div>
  );
}

function Text146() {
  return (
    <div className="h-[14px] relative shrink-0 w-[27.953px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[27.953px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[14px] left-0 not-italic text-[#00a63e] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">$420</p>
      </div>
    </div>
  );
}

function Container237() {
  return (
    <div className="content-stretch flex h-[14px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text145 />
      <Text146 />
    </div>
  );
}

function CarwashAdminDashboard48() {
  return (
    <div className="content-stretch flex flex-col gap-[7px] h-[56px] items-start relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <Container235 />
      <Container236 />
      <Container237 />
    </div>
  );
}

function Paragraph80() {
  return (
    <div className="h-[84px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#6e11b0] text-[14px] top-0 tracking-[-0.1504px] w-[302px]">Mid-afternoon period shows potential for customers with flexible schedules. $15 fixed discount appeals to cost-conscious customers avoiding peak hours.</p>
    </div>
  );
}

function CarwashAdminDashboard49() {
  return (
    <div className="bg-[rgba(243,232,255,0.5)] h-[100px] relative rounded-[3.5px] shrink-0 w-full" data-name="CarwashAdminDashboard">
      <div aria-hidden="true" className="absolute border border-[#e9d4ff] border-solid inset-0 pointer-events-none rounded-[3.5px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[100px] items-start pb-px pt-[8px] px-[8px] relative w-full">
          <Paragraph80 />
        </div>
      </div>
    </div>
  );
}

function Icon49() {
  return (
    <div className="absolute left-[108.44px] size-[14px] top-[7px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_23244_8431)" id="Icon">
          <path d={svgPaths.pc012c00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p1426c1f0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p206e4880} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_23244_8431">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button26() {
  return (
    <div className="bg-[#9810fa] h-[28px] relative rounded-[6.75px] shrink-0 w-full" data-name="Button">
      <Icon49 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-[179.19px] not-italic text-[12.25px] text-center text-nowrap text-white top-[5.25px] tracking-[-0.0179px] translate-x-[-50%] whitespace-pre">Apply Campaign</p>
    </div>
  );
}

function CardContent19() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[378px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[10.5px] h-full items-start px-[21px] py-0 relative w-[378px]">
        <CarwashAdminDashboard48 />
        <CarwashAdminDashboard49 />
        <Button26 />
      </div>
    </div>
  );
}

function Card25() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[21px] h-[329.75px] items-start p-px relative rounded-[12.75px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#e9d4ff] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <CardHeader6 />
      <CardContent19 />
    </div>
  );
}

function Badge13() {
  return (
    <div className="bg-purple-100 h-[19.5px] relative rounded-[6.75px] shrink-0 w-[118.813px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[3.5px] h-[19.5px] items-center justify-center overflow-clip px-[8px] py-[2.75px] relative rounded-[inherit] w-[118.813px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] not-italic relative shrink-0 text-[#8200db] text-[10.5px] text-nowrap tracking-[0.0923px] whitespace-pre">8:00 PM - 10:00 PM</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e9d4ff] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
    </div>
  );
}

function Container238() {
  return (
    <div className="bg-[#f0b100] relative rounded-[3.35544e+07px] shrink-0 size-[7px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[7px]" />
    </div>
  );
}

function Text147() {
  return (
    <div className="h-[14px] relative shrink-0 w-[22.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[22.563px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] top-0 tracking-[0.0923px] w-[23px]">79%</p>
      </div>
    </div>
  );
}

function CarwashAdminDashboard50() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[7px] h-[19.5px] items-center justify-self-stretch relative shrink-0" data-name="CarwashAdminDashboard">
      <Badge13 />
      <Container238 />
      <Text147 />
    </div>
  );
}

function CardTitle17() {
  return (
    <div className="[grid-area:2_/_1] place-self-stretch relative shrink-0" data-name="CardTitle">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Night Owl Special</p>
    </div>
  );
}

function CardHeader7() {
  return (
    <div className="h-[80.75px] relative shrink-0 w-[378px]" data-name="CardHeader">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border gap-[5.25px] grid grid-cols-[repeat(1,_minmax(0px,_1fr))] grid-rows-[minmax(0px,_23fr)_minmax(0px,_1fr)] h-[80.75px] pb-[10.5px] pt-[21px] px-[21px] relative w-[378px]">
        <CarwashAdminDashboard50 />
        <CardTitle17 />
      </div>
    </div>
  );
}

function Text148() {
  return (
    <div className="h-[14px] relative shrink-0 w-[47.828px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[47.828px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Discount:</p>
      </div>
    </div>
  );
}

function Text149() {
  return (
    <div className="h-[14px] relative shrink-0 w-[47.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[47.922px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[14px] left-0 not-italic text-[10.5px] text-neutral-950 top-0 tracking-[0.0923px] w-[48px]">25% OFF</p>
      </div>
    </div>
  );
}

function Container239() {
  return (
    <div className="content-stretch flex h-[14px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text148 />
      <Text149 />
    </div>
  );
}

function Text150() {
  return (
    <div className="h-[14px] relative shrink-0 w-[89.719px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[89.719px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Booking Increase:</p>
      </div>
    </div>
  );
}

function Text151() {
  return (
    <div className="h-[14px] relative shrink-0 w-[30.719px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[30.719px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[14px] left-0 not-italic text-[#00a63e] text-[10.5px] top-0 tracking-[0.0923px] w-[31px]">+75%</p>
      </div>
    </div>
  );
}

function Container240() {
  return (
    <div className="content-stretch flex h-[14px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text150 />
      <Text151 />
    </div>
  );
}

function Text152() {
  return (
    <div className="h-[14px] relative shrink-0 w-[68.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[68.25px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#717182] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">Est. Revenue:</p>
      </div>
    </div>
  );
}

function Text153() {
  return (
    <div className="h-[14px] relative shrink-0 w-[28.219px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[28.219px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[14px] left-0 not-italic text-[#00a63e] text-[10.5px] text-nowrap top-0 tracking-[0.0923px] whitespace-pre">$380</p>
      </div>
    </div>
  );
}

function Container241() {
  return (
    <div className="content-stretch flex h-[14px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text152 />
      <Text153 />
    </div>
  );
}

function CarwashAdminDashboard51() {
  return (
    <div className="content-stretch flex flex-col gap-[7px] h-[56px] items-start relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <Container239 />
      <Container240 />
      <Container241 />
    </div>
  );
}

function Paragraph81() {
  return (
    <div className="h-[63px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#6e11b0] text-[14px] top-0 tracking-[-0.1504px] w-[314px]">Evening hours appeal to shift workers and night owls. 25% discount incentivizes after-work visits when competition is lower.</p>
    </div>
  );
}

function CarwashAdminDashboard52() {
  return (
    <div className="bg-[rgba(243,232,255,0.5)] h-[79px] relative rounded-[3.5px] shrink-0 w-full" data-name="CarwashAdminDashboard">
      <div aria-hidden="true" className="absolute border border-[#e9d4ff] border-solid inset-0 pointer-events-none rounded-[3.5px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[79px] items-start pb-px pt-[8px] px-[8px] relative w-full">
          <Paragraph81 />
        </div>
      </div>
    </div>
  );
}

function Icon50() {
  return (
    <div className="absolute left-[108.44px] size-[14px] top-[7px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_23244_8431)" id="Icon">
          <path d={svgPaths.pc012c00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p1426c1f0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p206e4880} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_23244_8431">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button27() {
  return (
    <div className="bg-[#9810fa] h-[28px] relative rounded-[6.75px] shrink-0 w-full" data-name="Button">
      <Icon50 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-[179.19px] not-italic text-[12.25px] text-center text-nowrap text-white top-[5.25px] tracking-[-0.0179px] translate-x-[-50%] whitespace-pre">Apply Campaign</p>
    </div>
  );
}

function CardContent20() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[378px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[10.5px] h-full items-start px-[21px] py-0 relative w-[378px]">
        <CarwashAdminDashboard51 />
        <CarwashAdminDashboard52 />
        <Button27 />
      </div>
    </div>
  );
}

function Card26() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[21px] h-[308.75px] items-start p-px relative rounded-[12.75px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#e9d4ff] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <CardHeader7 />
      <CardContent20 />
    </div>
  );
}

function Container242() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] h-[996.25px] items-start relative shrink-0 w-full" data-name="Container">
      <Card24 />
      <Card25 />
      <Card26 />
    </div>
  );
}

function Container243() {
  return (
    <div className="content-stretch flex h-[31.5px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Bold',sans-serif] font-bold grow leading-[31.5px] min-h-px min-w-px not-italic relative shrink-0 text-[#9810fa] text-[26.25px] text-center tracking-[0.2355px]">94%</p>
    </div>
  );
}

function Container244() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-[168.48px] not-italic text-[#8200db] text-[10.5px] text-center text-nowrap top-0 tracking-[0.0923px] translate-x-[-50%] whitespace-pre">AI Success Rate</p>
    </div>
  );
}

function Paragraph82() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-[168.38px] not-italic text-[#9810fa] text-[10.5px] text-center text-nowrap top-0 tracking-[0.0923px] translate-x-[-50%] whitespace-pre">+47% avg bookings, +32% revenue</p>
    </div>
  );
}

function CarwashAdminDashboard53() {
  return (
    <div className="h-[70px] relative shrink-0 w-[336px]" data-name="CarwashAdminDashboard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[3.5px] h-[70px] items-start relative w-[336px]">
        <Container243 />
        <Container244 />
        <Paragraph82 />
      </div>
    </div>
  );
}

function Card27() {
  return (
    <div className="h-[107px] relative rounded-[12.75px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#e9d4ff] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[107px] items-start pb-px pl-[22px] pr-px pt-[15px] relative w-full">
          <CarwashAdminDashboard53 />
        </div>
      </div>
    </div>
  );
}

function Container245() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] h-[1169.75px] items-start relative shrink-0 w-full" data-name="Container">
      <Container229 />
      <Container242 />
      <Card27 />
    </div>
  );
}

function Container246() {
  return (
    <div className="[grid-area:1_/_2] content-stretch flex flex-col gap-[21px] items-start place-self-stretch relative shrink-0" data-name="Container">
      <Card22 />
      <Card23 />
      <Container245 />
    </div>
  );
}

function Container247() {
  return (
    <div className="gap-[21px] grid grid-cols-[minmax(0px,_1449fr)_minmax(0px,_1fr)] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[2962px] relative shrink-0 w-full" data-name="Container">
      <Container107 />
      <Container246 />
    </div>
  );
}

function CarwashAdminDashboard54() {
  return (
    <div className="content-stretch flex flex-col gap-[21px] h-[3042.5px] items-start relative shrink-0 w-full" data-name="CarwashAdminDashboard">
      <Container9 />
      <Container247 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1907px]" data-name="Main Content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-clip pb-0 pl-[21px] pr-[36px] pt-[21px] relative rounded-[inherit] w-[1907px]">
        <CarwashAdminDashboard54 />
      </div>
    </div>
  );
}

function Container248() {
  return (
    <div className="absolute content-stretch flex flex-col h-[1116px] items-start left-[224px] overflow-clip top-0 w-[1907px]" data-name="Container">
      <Header />
      <MainContent />
    </div>
  );
}

function AdminLayout() {
  return (
    <div className="absolute bg-white h-[1116px] left-0 top-0 w-[2131px]" data-name="AdminLayout">
      <AdminSidebar9 />
      <Container248 />
    </div>
  );
}

function Text154() {
  return (
    <div className="absolute h-[18px] left-0 top-[-20000px] w-[14.813px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[12px] text-neutral-950 text-nowrap top-0 whitespace-pre">20</p>
    </div>
  );
}

export default function V233NewSharedWithDenizCopy() {
  return (
    <div className="bg-white relative size-full" data-name="V2-3.3-new Shared with Deniz (Copy)">
      <AdminLayout />
      <Text154 />
    </div>
  );
}