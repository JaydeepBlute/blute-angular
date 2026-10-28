export interface CrmFlowStep {
  readonly title: string;
  readonly detail: string;
}

export interface CrmFlowScreen {
  readonly name: string;
  readonly points: readonly string[];
}

export interface CrmFlow {
  readonly slug: string;
  readonly title: string;
  readonly module: string;
  readonly summary: string;
  readonly steps: readonly CrmFlowStep[];
  readonly screens: readonly CrmFlowScreen[];
  readonly notes: readonly string[];
}

const LIST_PAGE_POINTS = [
  'Data table of all records',
  'Search filter to find a specific record',
  'Refresh button to reload the latest data',
  'Add (+) button to create a record',
  'Edit (pencil) and View (eye) buttons per row',
  'Pagination across records',
] as const;

const VIEW_TABS_NOTE = 'Every View page also carries Log (created / modified by and when) and Comments tabs.';

export const CRM_FLOWS: readonly CrmFlow[] = [
  {
    slug: 'installation',
    title: 'Installation Flow',
    module: 'Service · IMS',
    summary:
      'Set up a sold product at the customer site: raise the installation from a Sales Order, approve it, convert it to a Work Order, then unlock Asset, Warranty and PMS in sequence.',
    steps: [
      { title: 'Create Installation', detail: 'From the Installation list click +, pick the Sales Order reference by account name and choose products with IMS quantity.' },
      { title: 'Auto-fill site details', detail: 'On Submit the Account, Contact, Billing Address and Site Address are patched in from the Sales Order.' },
      { title: 'Approve', detail: 'Use Add Approval on the View page; reviewers see the decision in the Approval Log tab.' },
      { title: 'Convert to Work Order', detail: 'Click WO, fill the "Convert Installation to Work Order" dialog and convert. The WO appears in the Work Order list.' },
      { title: 'Complete the Work Order', detail: 'Expand the Work Order details and move it to the Completed stage — this enables the Asset button.' },
      { title: 'Create Asset', detail: 'Asset creation unlocks only after the Work Order is completed.' },
      { title: 'Create Warranty', detail: 'After the Asset exists, the Warranty button appears to capture warranty details.' },
      { title: 'Enable PMS', detail: 'Once the Warranty is created, Preventive Maintenance (PMS) becomes available.' },
    ],
    screens: [
      { name: 'Installation List', points: [...LIST_PAGE_POINTS, 'Cancel button — opens a "Cancel Installation" modal that needs remarks; cancelled records leave the list'] },
      { name: 'Installation Create / Edit', points: ['Save stays disabled until all mandatory fields are filled', 'Sales Order reference is read-only on the Edit page'] },
      { name: 'Installation View', points: ['Tabs: Installation Info, Approval Log, Product Info, Work Order Info (after conversion), Log, Comments', 'Buttons: Edit, Approval, CMS conversion, WO conversion', 'Click a Work Order number to jump to the Work Order View page'] },
    ],
    notes: ['The WO button is hidden when the installation has no products.', 'Draft and Convert-WO-from-IMS controls sit at the left corner of the View page.'],
  },
  {
    slug: 'complaint',
    title: 'Complaint Flow',
    module: 'Service · CMS',
    summary:
      'Log a customer complaint against an installed asset, attach evidence, then resolve it through a Work Order, a Spare Delivery Challan or a Spare Purchase Order.',
    steps: [
      { title: 'Create CMS', detail: 'Click + on the CMS list. Selecting an Asset Serial Number patches Account, Asset Name, Serial Number and Site Address.' },
      { title: 'Find by account', detail: 'Alternatively search by Account Name; the Asset dialog lists that account\'s assets and Submit patches all details.' },
      { title: 'Attach files', detail: 'Upload PDF, JPG, PNG, DOCX or XLSX — multiple files allowed, each shown with name, size and a remove option.' },
      { title: 'Convert to Work Order', detail: 'Click WO, complete the "Convert CMS To WorkOrder" dialog and convert. A service engineer then attends.' },
      { title: 'Raise a spare indent', detail: 'In the CMS-type Work Order click Indent, choose the Service Engineer and add General or Product spares with quantity and reason.' },
      { title: 'Estimate', detail: 'In Indent Info select a spare and click Estimate to convert the Work Order into an Estimation.' },
      { title: 'Issue or order spares', detail: 'Convert the CMS to a Spare DC (stock) or Spare PO (purchase). After a Spare DC conversion the Available Qty is deducted from Spare Stock.' },
    ],
    screens: [
      { name: 'CMS List', points: [...LIST_PAGE_POINTS, 'Cancel button — "Cancel CMS" modal with remarks'] },
      { name: 'CMS View', points: ['Tabs: CMS Info, Work Order Info, Indent Info, Spare DC Info, Spare Stock, Log, Docs, Comments', 'Buttons: Edit, Spare-PO, Spare-DC, Indent, WO conversion', 'Indent Info and Spare Stock appear after an indent is created'] },
      { name: 'Work Order (CMS type)', points: ['Tabs: Work Order Info, EFSR, Log, Indent, Comments', 'Track Status tab appears after the Work Order is accepted, showing the assigned service engineer', 'EFSR modal lists file name and asset number with a download button'] },
    ],
    notes: ['The Docs tab only appears once documents have been uploaded on Create or Edit.'],
  },
  {
    slug: 'work-order',
    title: 'Work Order Flow',
    module: 'Service · Work Order',
    summary:
      'One execution record for the three service jobs — IMS (installation), CMS (complaint) and PMS (preventive) — with engineer tracking, EFSR reports and spare indents.',
    steps: [
      { title: 'Create or convert', detail: 'Create directly with +, or convert from an Installation, CMS or PMS record.' },
      { title: 'Choose the type', detail: 'Work Orders are one of IMS, CMS or PMS.' },
      { title: 'Accept and track', detail: 'After acceptance a Track Status tab shows the service engineer working the order.' },
      { title: 'Capture EFSR', detail: 'Per product, open the EFSR modal to view and download field service report files.' },
      { title: 'Indent spares', detail: 'On CMS-type orders raise a Spare Indent; convert it to an Estimation.' },
      { title: 'Complete / convert to Asset', detail: 'On IMS-type orders the Asset button opens "work order to asset"; fill details and convert.' },
    ],
    screens: [
      { name: 'Work Order List', points: [...LIST_PAGE_POINTS, 'Cancel button — "Cancel Work Order" modal with remarks'] },
      { name: 'Work Order View', points: ['Tabs: Work Order Info, EFSR, Log, Indent, Comments (Docs once files exist)', 'Buttons: Edit, Indent'] },
    ],
    notes: ['Upload supporting files on Create or Edit (PDF, JPG, PNG, DOCX, XLSX).'],
  },
  {
    slug: 'preventive-maintenance',
    title: 'Preventive Maintenance Flow',
    module: 'Service · PMS',
    summary: 'Schedule recurring maintenance against an asset and turn each schedule into a Work Order.',
    steps: [
      { title: 'Create PMS', detail: 'Pick an Asset Serial Number (or search by account) to patch Account, Asset, Billing and Site address.' },
      { title: 'Schedule', detail: 'Click Schedule, select schedules, maintenance date and time, then Submit.' },
      { title: 'Review schedules', detail: 'On Edit, Get Schedules lists all schedules.' },
      { title: 'Convert to Work Order', detail: 'Click WO, choose schedules and a work order date in "Convert PMS to Work Order", then Convert.' },
    ],
    screens: [
      { name: 'PMS List', points: [...LIST_PAGE_POINTS, 'Cancel button — "Cancel PMS" modal with remarks'] },
      { name: 'PMS View', points: ['Tabs: PMS Info (with all schedules), Work Order Info, Log, Comments', 'Buttons: Edit, WO conversion'] },
    ],
    notes: ['PMS becomes available only after the Asset has a Warranty (see Installation Flow).'],
  },
  {
    slug: 'amc',
    title: 'AMC Flow',
    module: 'Service · AMC',
    summary: 'Manage annual maintenance contracts, generate billing and PMS schedules from them, and print the contract.',
    steps: [
      { title: 'Create AMC', detail: 'Fill mandatory fields and optionally upload supporting documents.' },
      { title: 'Approve', detail: 'Use the Approval button; decisions are recorded in the Approval Log tab.' },
      { title: 'Convert to Billing', detail: 'Click Billing, complete "Convert AMC to Billing"; entries appear in Billing Schedules.' },
      { title: 'Convert to PMS', detail: 'Click PMS, complete "Convert AMC to PMS"; entries appear in PMS Schedules.' },
      { title: 'Print', detail: 'Click Print then Submit to open the AMC print.' },
    ],
    screens: [
      { name: 'AMC List', points: [...LIST_PAGE_POINTS, 'Cancel button — "Cancel AMC" modal with remarks'] },
      { name: 'AMC View', points: ['Tabs: AMC Info, Billing Schedules, PMS Schedules, Log, Docs, Approval Log, Comments', 'Buttons: Edit, Billing, PMS, Print, Approval'] },
    ],
    notes: ['The Docs tab only appears once documents have been uploaded.'],
  },
  {
    slug: 'sales',
    title: 'Sales Flow',
    module: 'Sales',
    summary: 'Lead-to-cash: Accounts and Contacts, Leads, Opportunity, Quotation, Sales Order, Invoice or Proforma Invoice, then Payment receipt.',
    steps: [
      { title: 'Accounts & Contacts', detail: 'Create the business and its people; verify GSTIN while adding billing and shipping addresses.' },
      { title: 'Lead → Opportunity', detail: 'Qualified leads convert to Opportunities.' },
      { title: 'Opportunity → Quotation / Sales Order', detail: 'Convert directly; Conversion Info records the link.' },
      { title: 'Quotation', detail: 'Review Margin Analysis and Approval Log, track Amendment History, then convert to PI or Sales Order.' },
      { title: 'Sales Order', detail: 'Convert to Proforma Invoice or Invoice after approval.' },
      { title: 'Invoice & Payment', detail: 'Invoice with approval log; Payment-Recv applies payments to unpaid invoices.' },
    ],
    screens: [
      { name: 'Common list pages', points: LIST_PAGE_POINTS },
      { name: 'Reports', points: ['Accounts, Contacts, Products, Leads, Activity lists', 'Products by Sales, Sales Review', 'Opportunity, Quotation, Sales Order, Invoice reports (summary and detailed)', 'Invoice Cancellation and E-Invoice reports'] },
    ],
    notes: [VIEW_TABS_NOTE],
  },
  {
    slug: 'inventory',
    title: 'Inventory Flow',
    module: 'Inventory',
    summary: 'Stock in and out across suppliers and warehouses: GRN, delivery challans, returns, adjustments, payables and notes.',
    steps: [
      { title: 'Suppliers & Products', detail: 'Maintain suppliers, their contacts and inventory products.' },
      { title: 'GRN', detail: 'Receive goods; convert a GRN to a Purchase Bill (PB Conversion).' },
      { title: 'DC', detail: 'Issue delivery challans; convert to Invoice (INV Conversion).' },
      { title: 'RMA & Stock Adjustment', detail: 'Handle returns and correct stock quantities.' },
      { title: 'Payable, Credit & Debit Notes', detail: 'Track amounts owed and adjust them with notes.' },
    ],
    screens: [{ name: 'Common list pages', points: LIST_PAGE_POINTS }],
    notes: [VIEW_TABS_NOTE],
  },
  {
    slug: 'purchase',
    title: 'Purchase Flow',
    module: 'Purchase',
    summary: 'Procure from Purchase Order to Purchase Bill, with products and additional charges visible on each View page.',
    steps: [
      { title: 'Purchase Order', detail: 'Create, edit and view POs; PO Type is configured in Purchase Master.' },
      { title: 'Receive', detail: 'Receive goods through GRN in the Inventory module.' },
      { title: 'Purchase Bill', detail: 'Create the bill; products and additional charges show on the View page.' },
    ],
    screens: [{ name: 'Common list pages', points: LIST_PAGE_POINTS }],
    notes: [VIEW_TABS_NOTE],
  },
  {
    slug: 'getting-started',
    title: 'Login & Setup Flow',
    module: 'Settings',
    summary: 'Sign in, read the dashboard and configure company masters before any module is used.',
    steps: [
      { title: 'Log in', detail: 'Enter a valid Tenant ID, username and password, then click Login.' },
      { title: 'Dashboard', detail: 'See module cards, sales overview, total orders, top 10 products, customers and opportunities. The top bar offers Verify GSTIN, HSN and your username.' },
      { title: 'Alerts', detail: 'Open Alerts for Expired Follow-Ups, Approval Status and Reminders.' },
      { title: 'Settings → Master', detail: 'Configure Company, Sales, Inventory, Purchase and Service masters.' },
      { title: 'Company Setup', detail: 'Edit company basics, contact, statutory, bank and dispatch details, then Save.' },
      { title: 'Users, Roles & Groups', detail: 'Create groups (with child groups), roles and users from the Users card.' },
    ],
    screens: [
      { name: 'Company Master', points: ['Setup, Users, Regions, Payment Modes, Delivery Terms', 'Qty Pay Types, Terms and Conditions, Approval Master', 'Additional Charges, HSN (with Excel bulk upload)'] },
      { name: 'Service Master', points: ['Installation Status / Stages / Type', 'Asset Type / Criticality / Category', 'Warranty Type, Frequency, Product Group', 'Preventive Stages and Status'] },
    ],
    notes: ['Master pages share one pattern: list with search and refresh, + for inline-edit create, pencil to edit, Back to Master.'],
  },
];

export interface CrmGuide {
  readonly name: string;
  readonly role: string;
  readonly tint: number;
}

export const CRM_GUIDES: Readonly<Record<string, CrmGuide>> = {
  installation: { name: 'Ira', role: 'Installation Lead', tint: 0xffffff },
  complaint: { name: 'Cara', role: 'Complaint Desk', tint: 0xffd9d2 },
  'work-order': { name: 'Wanda', role: 'Field Work Orders', tint: 0xffe6bd },
  'preventive-maintenance': { name: 'Priya', role: 'Maintenance Scheduler', tint: 0xcdf5de },
  amc: { name: 'Amara', role: 'Contracts Manager', tint: 0xd6ddff },
  sales: { name: 'Michelle', role: 'Sales Guide', tint: 0xffffff },
  inventory: { name: 'Isha', role: 'Stock Keeper', tint: 0xcdf0f6 },
  purchase: { name: 'Pia', role: 'Procurement Guide', tint: 0xf8f2c0 },
  'getting-started': { name: 'Mia', role: 'Onboarding Guide', tint: 0xf5e1ff },
};
