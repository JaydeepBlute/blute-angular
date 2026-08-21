import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export interface BusSeatItem {
  id: string;
  deck: 'Lower' | 'Upper';
  tier: 'Executive' | 'Classic' | 'Budget';
  type: 'Single Sleeper' | 'Double Sleeper';
  price: number;
  status: 'available' | 'booked' | 'ladies_reserved' | 'selected';
  position: 'Window' | 'Aisle';
  column: number;
}

export interface MobilityFeature {
  title: string;
  category: string;
  description: string;
  bullets: string[];
  icon: string;
  color: string;
}

export interface MetricHighlight {
  value: string;
  label: string;
  detail: string;
}

@Component({
  selector: 'app-mobility-ops-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mobility-ops-home.component.html',
  styleUrls: ['./mobility-ops-home.component.scss'],
})
export class MobilityOpsHomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('threeCanvas', { static: false }) threeCanvasRef!: ElementRef<HTMLCanvasElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private meshGroup!: THREE.Group;
  private raycaster = new THREE.Raycaster();
  private mouseVec = new THREE.Vector2();
  private animationFrameId?: number;
  private seatMeshMap = new Map<string, THREE.Mesh>();
  private seatMeshesList: THREE.Mesh[] = [];

  productName = 'Mobility & Intercity Bus Operations Platform';
  heroTitle = 'Next-Gen Bus Ticketing, Live GPS & Fleet Operations Platform';
  heroSubtitle =
    'Built for bus operators, fleet owners, and travel aggregators. Combines consumer-facing instant seat booking, live GPS tracking, conductor mobile POS, travel agent commissions, and depot fleet maintenance into one unified platform.';

  activeSimulatorTab: 'b2c' | 'gps' | 'fleet' | 'agent' | 'b2b' = 'b2c';
  viewMode: '2d' | '3d' = '2d';
  searchQuery = '';

  // Bus Seat Booking State
  selectedDeck: 'Lower' | 'Upper' = 'Lower';
  selectedSeats: string[] = ['L03', 'U04'];
  selectedBoarding = 'Silk Board Junction (10:30 PM)';
  selectedDropping = 'Ameerpet Metro Station (06:30 AM)';
  passengerName = 'Rahul Sharma';
  passengerPhone = '+91 98765 43210';
  passengerEmail = 'rahul.sharma@example.com';
  sendWhatsapp = true;
  showCheckoutModal = false;
  showTicketSuccess = false;
  generatedPNR = '';

  boardingPoints = [
    'Silk Board Junction (10:30 PM)',
    'Koramangala Sony World (10:45 PM)',
    'Indiranagar 100ft Road (11:05 PM)',
    'Majestic Bus Stand (11:30 PM)',
  ];

  droppingPoints = [
    'Kurnool Bypass (04:15 AM)',
    'Jadcherla Toll (05:10 AM)',
    'Lakdikapul (06:00 AM)',
    'Ameerpet Metro Station (06:30 AM)',
  ];

  // Bus Seats Data
  lowerDeckSeats: BusSeatItem[] = [
    { id: 'L01', deck: 'Lower', tier: 'Executive', type: 'Single Sleeper', price: 1650, status: 'available', position: 'Window', column: 1 },
    { id: 'L02', deck: 'Lower', tier: 'Executive', type: 'Single Sleeper', price: 1650, status: 'ladies_reserved', position: 'Aisle', column: 1 },
    { id: 'L03', deck: 'Lower', tier: 'Executive', type: 'Double Sleeper', price: 1850, status: 'selected', position: 'Window', column: 2 },
    { id: 'L04', deck: 'Lower', tier: 'Executive', type: 'Double Sleeper', price: 1850, status: 'available', position: 'Aisle', column: 2 },
    { id: 'L05', deck: 'Lower', tier: 'Classic', type: 'Single Sleeper', price: 1450, status: 'booked', position: 'Window', column: 3 },
    { id: 'L06', deck: 'Lower', tier: 'Classic', type: 'Single Sleeper', price: 1450, status: 'booked', position: 'Aisle', column: 3 },
    { id: 'L07', deck: 'Lower', tier: 'Classic', type: 'Double Sleeper', price: 1550, status: 'available', position: 'Window', column: 4 },
    { id: 'L08', deck: 'Lower', tier: 'Classic', type: 'Double Sleeper', price: 1550, status: 'available', position: 'Aisle', column: 4 },
    { id: 'L09', deck: 'Lower', tier: 'Budget', type: 'Single Sleeper', price: 1250, status: 'available', position: 'Window', column: 5 },
    { id: 'L10', deck: 'Lower', tier: 'Budget', type: 'Single Sleeper', price: 1250, status: 'booked', position: 'Aisle', column: 5 },
    { id: 'L11', deck: 'Lower', tier: 'Budget', type: 'Double Sleeper', price: 1350, status: 'available', position: 'Window', column: 6 },
    { id: 'L12', deck: 'Lower', tier: 'Budget', type: 'Double Sleeper', price: 1350, status: 'available', position: 'Aisle', column: 6 },
  ];

  upperDeckSeats: BusSeatItem[] = [
    { id: 'U01', deck: 'Upper', tier: 'Executive', type: 'Single Sleeper', price: 1750, status: 'available', position: 'Window', column: 1 },
    { id: 'U02', deck: 'Upper', tier: 'Executive', type: 'Single Sleeper', price: 1750, status: 'booked', position: 'Aisle', column: 1 },
    { id: 'U03', deck: 'Upper', tier: 'Executive', type: 'Double Sleeper', price: 1950, status: 'available', position: 'Window', column: 2 },
    { id: 'U04', deck: 'Upper', tier: 'Executive', type: 'Double Sleeper', price: 1950, status: 'selected', position: 'Aisle', column: 2 },
    { id: 'U05', deck: 'Upper', tier: 'Classic', type: 'Single Sleeper', price: 1550, status: 'ladies_reserved', position: 'Window', column: 3 },
    { id: 'U06', deck: 'Upper', tier: 'Classic', type: 'Single Sleeper', price: 1550, status: 'available', position: 'Aisle', column: 3 },
    { id: 'U07', deck: 'Upper', tier: 'Classic', type: 'Double Sleeper', price: 1650, status: 'available', position: 'Window', column: 4 },
    { id: 'U08', deck: 'Upper', tier: 'Classic', type: 'Double Sleeper', price: 1650, status: 'booked', position: 'Aisle', column: 4 },
    { id: 'U09', deck: 'Upper', tier: 'Budget', type: 'Single Sleeper', price: 1350, status: 'available', position: 'Window', column: 5 },
    { id: 'U10', deck: 'Upper', tier: 'Budget', type: 'Single Sleeper', price: 1350, status: 'available', position: 'Aisle', column: 5 },
    { id: 'U11', deck: 'Upper', tier: 'Budget', type: 'Double Sleeper', price: 1450, status: 'booked', position: 'Window', column: 6 },
    { id: 'U12', deck: 'Upper', tier: 'Budget', type: 'Double Sleeper', price: 1450, status: 'available', position: 'Aisle', column: 6 },
  ];

  metrics: MetricHighlight[] = [
    { value: '100K+', label: 'Daily Bookings Processed', detail: 'Sub-second seat locking engine' },
    { value: '99.9%', label: 'GPS Tracking Uptime', detail: 'Live ETA & boarding alerts' },
    { value: '45 Sec', label: 'Conductor POS Issue Time', detail: 'Instant QR e-tickets & thermal printing' },
    { value: '100%', label: 'GST & Statutory Invoicing', detail: 'Multi-operator & agent commission ledger' },
  ];

  features: MobilityFeature[] = [
    {
      title: 'B2C Smart Seat Booking & Dynamic Fares',
      category: 'Consumer Passenger App',
      description:
        'Interactive 2D/3D seat layouts for Volvo, Scania, Sleeper, and Seater coaches. Automated surge pricing, seat lock engines, and instant WhatsApp & SMS ticket delivery.',
      bullets: [
        'Interactive Sleeper/Seater floor plan selection',
        'Sub-second seat holding & lock prevention',
        'Automated surge & route demand pricing engine',
        'Instant WhatsApp e-ticket & m-ticket generation',
      ],
      icon: 'ticket',
      color: 'from-rose-600 to-red-600',
    },
    {
      title: 'Real-Time GPS Tracking & Geo-Fenced Boarding',
      category: 'Passenger Safety & Live ETA',
      description:
        'Live vehicle position stream with shareable tracking links for family members, automated SMS boarding alerts when bus is 15 minutes away, and driver panic button integration.',
      bullets: [
        'Live vehicle map stream & estimated arrival time',
        'Geo-fenced SMS alerts to passengers at pickup points',
        'Shareable live trip location link for safety',
        'SOS emergency alert & driver monitoring engine',
      ],
      icon: 'map-pin',
      color: 'from-amber-500 to-orange-600',
    },
    {
      title: 'Depot Fleet Operations & Conductor POS',
      category: 'Operator Operations',
      description:
        'Manage route inventory, bus scheduling, crew shifts, handheld Android POS ticketing for conductors, and contactless QR ticket validation at boarding gates.',
      bullets: [
        'Handheld Android POS for mid-route passenger ticketing',
        'QR code boarding pass scanner for fast boarding',
        'Depot crew allocation & trip expense vouchers',
        'Waybill generation & daily counter cash audit',
      ],
      icon: 'truck',
      color: 'from-blue-600 to-indigo-600',
    },
    {
      title: 'Agent & Franchise Booking Portal',
      category: 'B2B Distribution Network',
      description:
        'Empower travel agents and offline booking counters with dedicated portals, instant commission settlement, credit line limits, and multi-currency payment options.',
      bullets: [
        'Sub-agent credit limit & instant wallet reload',
        'Tiered commission structures & payout reports',
        'Counter ticket printing & cancellation management',
        'Open API integrations for travel OTAs',
      ],
      icon: 'users',
      color: 'from-emerald-600 to-teal-600',
    },
    {
      title: 'Vehicle Maintenance & Fuel Telemetry',
      category: 'Fleet Management',
      description:
        'Preventive bus maintenance, tire wear logs, fuel mileage telemetry, driver scorecards (harsh braking, over-speeding), and automated workshop job cards.',
      bullets: [
        'Fuel consumption & mileage variance tracking',
        'Automated tire lifecycle & oil change alerts',
        'Driver behavior rating (harsh braking & speed compliance)',
        'Workshop job cards & spare inventory linkage',
      ],
      icon: 'tool',
      color: 'from-purple-600 to-violet-600',
    },
    {
      title: 'Corporate Employee Transport & B2B Billing',
      category: 'Enterprise Mobility',
      description:
        'Dedicated corporate portal for company employee commute management, monthly roster scheduling, automated GST e-invoices, and employee trip feedback.',
      bullets: [
        'Corporate monthly commute roster management',
        'GST compliance B2B invoices with IRN',
        'Automated employee drop-off verification',
        'Corporate billing ledger & credit terms',
      ],
      icon: 'briefcase',
      color: 'from-cyan-600 to-blue-600',
    },
  ];

  selectSimulatorTab(tab: 'b2c' | 'gps' | 'fleet' | 'agent' | 'b2b'): void {
    this.activeSimulatorTab = tab;
    if (tab === 'b2c' && this.viewMode === '3d') {
      setTimeout(() => this.initThreeScene(), 50);
    }
  }

  toggleViewMode(mode: '2d' | '3d'): void {
    this.viewMode = mode;
    if (mode === '3d') {
      setTimeout(() => this.initThreeScene(), 50);
    }
  }

  toggleSeat(seatId: string): void {
    const idx = this.selectedSeats.indexOf(seatId);
    if (idx >= 0) {
      this.selectedSeats.splice(idx, 1);
    } else {
      this.selectedSeats.push(seatId);
    }
    if (this.viewMode === '3d') {
      this.update3DSeatColors();
    }
  }

  isSeatSelected(seatId: string): boolean {
    return this.selectedSeats.includes(seatId);
  }

  get activeSeatsList(): BusSeatItem[] {
    const allSeats = [...this.lowerDeckSeats, ...this.upperDeckSeats];
    return allSeats.filter((s) => this.selectedSeats.includes(s.id));
  }

  get totalSeatCost(): number {
    return this.activeSeatsList.reduce((sum, s) => sum + s.price, 0);
  }

  get totalWithGST(): number {
    return Math.round(this.totalSeatCost * 1.05);
  }

  get filteredFeatures(): MobilityFeature[] {
    if (!this.searchQuery.trim()) return this.features;
    const q = this.searchQuery.toLowerCase();
    return this.features.filter(
      (f) =>
        f.title.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.bullets.some((b) => b.toLowerCase().includes(q))
    );
  }

  openCheckoutModal(): void {
    if (this.selectedSeats.length === 0) return;
    this.showCheckoutModal = true;
    this.showTicketSuccess = false;
  }

  closeCheckoutModal(): void {
    this.showCheckoutModal = false;
  }

  confirmBooking(): void {
    this.generatedPNR = 'MOB-' + Math.floor(100000 + Math.random() * 900000);
    this.showTicketSuccess = true;
  }

  get activeSimulatorDetails() {
    switch (this.activeSimulatorTab) {
      case 'b2c':
        return {
          title: 'Interactive Bus Seat Booking Engine',
          subtitle: 'Executive vs Classic Sleeper Berths & WhatsApp E-Ticket',
          badge: 'Live Seat Engine',
          stats: [
            { label: 'Selected Seats', val: this.selectedSeats.join(', ') || 'None', detail: 'Live Selected Seats' },
            { label: 'Total Payable', val: `₹${this.totalWithGST}`, detail: 'Includes GST & Insurance' },
            { label: 'Boarding Point', val: this.selectedBoarding, detail: 'Geo-fence Tracked' },
          ],
        };
      case 'gps':
        return {
          title: 'Live Vehicle Telemetry & GPS Route Stream',
          subtitle: 'Satellite Orbit & Geo-Fenced Bus Tracking',
          badge: 'GPS Telemetry Active',
          stats: [
            { label: 'Current Bus Speed', val: '74 km/h (Expressway)', detail: 'Within Safe Speed Limit' },
            { label: 'ETA to Boarding Point', val: '12 Minutes', detail: 'SMS Notification Sent' },
            { label: 'Passenger Safety Link', val: 'Active (Live Track)', detail: 'Shared with Emergency Contact' },
          ],
        };
      case 'fleet':
        return {
          title: 'Conductor Mobile POS & Terminal Simulator',
          subtitle: 'Handheld Ticketing & Waybill Cash Reconciliation',
          badge: 'Depot Fleet Active',
          stats: [
            { label: 'Checked-in Passengers', val: '32 / 36 Passengers', detail: 'Scanned via QR Code' },
            { label: 'Waybill Collection', val: '₹44,200 Cash & UPI', detail: 'Real-time Reconciled' },
            { label: 'Fuel Telemetry', val: '4.8 km/L Average Mileage', detail: 'Optimal Telemetry Status' },
          ],
        };
      case 'agent':
        return {
          title: 'Agent Franchise Node Network Simulator',
          subtitle: 'Instant Commissions & Sub-Agent Credit Limits',
          badge: 'Agent Network Active',
          stats: [
            { label: 'Active Travel Agents', val: '420 Agents Network', detail: '24 Cities Covered' },
            { label: 'Agent Wallet Credit', val: '₹1,50,000 Total Limit', detail: 'Auto-Reload Configured' },
            { label: 'Commission Settled Today', val: '₹18,400 Paid Out', detail: '8% Tier Commission' },
          ],
        };
      case 'b2b':
        return {
          title: 'Corporate Transit Shuttle Matrix',
          subtitle: 'Roster Automation & GST Invoicing with IRN',
          badge: 'Corporate B2B Active',
          stats: [
            { label: 'Corporate Tech Parks', val: '14 Enterprise Clients', detail: 'Daily Commute Fleet' },
            { label: 'Roster Drop Completion', val: '99.4% Drop Rate', detail: 'Verified via Driver OTP' },
            { label: 'GST E-Invoice Status', val: '100% Tax Compliant', detail: 'IRN & QR Code Attached' },
          ],
        };
    }
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  ngAfterViewInit(): void {
    if (this.viewMode === '3d') {
      this.initThreeScene();
    }
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.controls) {
      this.controls.dispose();
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  onCanvasPointerDown(event: MouseEvent): void {
    if (!this.threeCanvasRef || !this.renderer || !this.camera) return;

    const canvas = this.threeCanvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    this.mouseVec.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouseVec.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouseVec, this.camera);
    const intersects = this.raycaster.intersectObjects(this.seatMeshesList, true);

    if (intersects.length > 0) {
      const target = intersects[0].object as THREE.Mesh;
      const seatId = target.userData['seatId'];
      const isBooked = target.userData['isBooked'];

      if (seatId && !isBooked) {
        this.toggleSeat(seatId);
      }
    }
  }

  private initThreeScene(): void {
    if (typeof window === 'undefined' || !this.threeCanvasRef) return;

    const canvas = this.threeCanvasRef.nativeElement;
    const width = canvas.parentElement?.clientWidth || 800;
    const height = 450;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0f172a);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(0, 9, 16);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Enable OrbitControls for Drag, Pan & Wheel Zooming by User (NO AUTOSCROLL)
    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 6;
    this.controls.maxDistance = 35;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.05;

    const ambLight = new THREE.AmbientLight(0xffffff, 1.2);
    this.scene.add(ambLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(10, 20, 15);
    this.scene.add(dirLight);

    this.meshGroup = new THREE.Group();
    this.scene.add(this.meshGroup);

    this.update3DSceneForTab(this.activeSimulatorTab);

    // Animation Loop updates OrbitControls (No Auto-Rotation)
    const animate = () => {
      this.animationFrameId = requestAnimationFrame(animate);
      if (this.controls) {
        this.controls.update();
      }
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }

  private update3DSceneForTab(tab: 'b2c' | 'gps' | 'fleet' | 'agent' | 'b2b'): void {
    if (!this.meshGroup) return;

    while (this.meshGroup.children.length > 0) {
      const obj = this.meshGroup.children[0];
      if (obj) {
        this.meshGroup.remove(obj);
      }
    }
    this.seatMeshMap.clear();
    this.seatMeshesList = [];

    if (tab === 'b2c') {
      // ── 1. AERODYNAMIC CURVED BUS CHASSIS & FLOOR PLATES ──
      
      // Helper function to create rounded rectangular shapes with subtle bevel curves
      const createCurvedBoxShape = (width: number, depth: number, radius: number) => {
        const shape = new THREE.Shape();
        const w = width / 2;
        const d = depth / 2;
        shape.moveTo(-w + radius, -d);
        shape.lineTo(w - radius, -d);
        shape.quadraticCurveTo(w, -d, w, -d + radius);
        shape.lineTo(w, d - radius);
        shape.quadraticCurveTo(w, d, w - radius, d);
        shape.lineTo(-w + radius, d);
        shape.quadraticCurveTo(-w, d, -w, d - radius);
        shape.lineTo(-w, -d + radius);
        shape.quadraticCurveTo(-w, -d, -w + radius, -d);
        return shape;
      };

      // Aerodynamic Curved Bus Floor Plate
      const floorShape = createCurvedBoxShape(16.5, 6.2, 0.6);
      const floorExtrudeSettings = { depth: 0.25, bevelEnabled: true, bevelSegments: 4, steps: 1, bevelSize: 0.08, bevelThickness: 0.08 };
      const floorGeo = new THREE.ExtrudeGeometry(floorShape, floorExtrudeSettings);
      floorGeo.rotateX(Math.PI / 2);

      const floorMat = new THREE.MeshPhongMaterial({ color: 0x1e293b, shininess: 90 });
      const floor = new THREE.Mesh(floorGeo, floorMat);
      floor.position.set(0, -2.5, 0);
      this.meshGroup.add(floor);

      // Mid-Deck Support Floor Plate with Subtle Curves
      const midFloorMat = new THREE.MeshPhongMaterial({ color: 0x334155, transparent: true, opacity: 0.65 });
      const midFloor = new THREE.Mesh(floorGeo, midFloorMat);
      midFloor.position.set(0, -0.2, 0);
      this.meshGroup.add(midFloor);

      // Front Glowing Headlights (Yellow)
      const headlightGeo = new THREE.BoxGeometry(0.3, 0.5, 0.8);
      const headlightMat = new THREE.MeshBasicMaterial({ color: 0xfde047 });
      const leftLight = new THREE.Mesh(headlightGeo, headlightMat); leftLight.position.set(-8.1, -1.8, 2.2);
      const rightLight = new THREE.Mesh(headlightGeo, headlightMat); rightLight.position.set(-8.1, -1.8, -2.2);
      this.meshGroup.add(leftLight); this.meshGroup.add(rightLight);

      // Rear Taillights (Red)
      const taillightGeo = new THREE.BoxGeometry(0.3, 0.6, 0.8);
      const taillightMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e });
      const rearLeftLight = new THREE.Mesh(taillightGeo, taillightMat); rearLeftLight.position.set(8.1, -1.8, 2.2);
      const rearRightLight = new THREE.Mesh(taillightGeo, taillightMat); rearRightLight.position.set(8.1, -1.8, -2.2);
      this.meshGroup.add(rearLeftLight); this.meshGroup.add(rearRightLight);

      // 4 Multi-Axle Bus Wheels (Rubber Tires + Chrome Silver Rims)
      const tirePositions = [
        { x: -5, z: 3.1 },
        { x: -5, z: -3.1 },
        { x: 5, z: 3.1 },
        { x: 5, z: -3.1 },
      ];

      tirePositions.forEach((pos) => {
        const tireGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.5, 24);
        const tireMat = new THREE.MeshPhongMaterial({ color: 0x0f172a });
        const tire = new THREE.Mesh(tireGeo, tireMat);
        tire.rotation.x = Math.PI / 2;
        tire.position.set(pos.x, -2.9, pos.z);

        const rimGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.52, 16);
        const rimMat = new THREE.MeshPhongMaterial({ color: 0xcbd5e1, shininess: 100 });
        const rim = new THREE.Mesh(rimGeo, rimMat);
        rim.rotation.x = Math.PI / 2;
        rim.position.set(pos.x, -2.9, pos.z);

        this.meshGroup.add(tire);
        this.meshGroup.add(rim);
      });

      // ── 2. DRIVER CABIN & COCKPIT ──

      const driverSeatGeo = new THREE.BoxGeometry(1.1, 1.8, 1.1);
      const driverSeatMat = new THREE.MeshPhongMaterial({ color: 0x334155 });
      const driverSeat = new THREE.Mesh(driverSeatGeo, driverSeatMat);
      driverSeat.position.set(-6.5, -1.4, 1.8);
      this.meshGroup.add(driverSeat);

      const steeringWheelGeo = new THREE.TorusGeometry(0.55, 0.1, 16, 32);
      const steeringWheelMat = new THREE.MeshPhongMaterial({ color: 0xf43f5e, shininess: 80 });
      const steeringWheel = new THREE.Mesh(steeringWheelGeo, steeringWheelMat);
      steeringWheel.position.set(-6.5, -0.6, 1.8);
      steeringWheel.rotation.y = Math.PI / 2;
      this.meshGroup.add(steeringWheel);

      const ladderBarGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.6, 16);
      const ladderMat = new THREE.MeshPhongMaterial({ color: 0x94a3b8, shininess: 90 });
      const l1 = new THREE.Mesh(ladderBarGeo, ladderMat); l1.position.set(-1, -0.2, 0);
      const l2 = new THREE.Mesh(ladderBarGeo, ladderMat); l2.position.set(3, -0.2, 0);
      this.meshGroup.add(l1); this.meshGroup.add(l2);

      // ── 3. LUXURY ERGONOMIC 3D SLEEPER BERTHS WITH SUBTLE CURVED GEOMETRY ──

      const mattressShape = createCurvedBoxShape(1.7, 1.2, 0.15);
      const mattressExtrudeSettings = { depth: 0.35, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.04, bevelThickness: 0.05 };
      const mattressGeo = new THREE.ExtrudeGeometry(mattressShape, mattressExtrudeSettings);
      mattressGeo.rotateX(Math.PI / 2);

      const backrestShape = createCurvedBoxShape(0.28, 1.15, 0.08);
      const backrestExtrudeSettings = { depth: 0.65, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.03, bevelThickness: 0.04 };
      const backrestGeo = new THREE.ExtrudeGeometry(backrestShape, backrestExtrudeSettings);
      backrestGeo.rotateX(Math.PI / 2);

      const pillowShape = createCurvedBoxShape(0.35, 0.95, 0.1);
      const pillowExtrudeSettings = { depth: 0.2, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.03, bevelThickness: 0.04 };
      const pillowGeo = new THREE.ExtrudeGeometry(pillowShape, pillowExtrudeSettings);
      pillowGeo.rotateX(Math.PI / 2);

      const baseShape = createCurvedBoxShape(1.8, 1.3, 0.12);
      const baseExtrudeSettings = { depth: 0.12, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 };
      const baseGeo = new THREE.ExtrudeGeometry(baseShape, baseExtrudeSettings);
      baseGeo.rotateX(Math.PI / 2);

      const renderDeckSeats = (seats: BusSeatItem[], yOffset: number) => {
        seats.forEach((seat, idx) => {
          const row = Math.floor(idx / 2);
          const col = idx % 2;

          const x = -4.5 + row * 2.1;
          const z = col === 0 ? -1.8 : 1.8;

          // Cabin Privacy Partition Wall
          const partGeo = new THREE.BoxGeometry(0.06, 1.2, 1.3);
          const partMat = new THREE.MeshPhongMaterial({ color: 0x1e293b });
          const partMesh = new THREE.Mesh(partGeo, partMat);
          partMesh.position.set(x - 0.9, yOffset + 0.3, z);
          this.meshGroup.add(partMesh);

          // Bed Base Frame with Curves
          const baseMat = new THREE.MeshPhongMaterial({ color: 0x0f172a });
          const baseMesh = new THREE.Mesh(baseGeo, baseMat);
          baseMesh.position.set(x, yOffset - 0.22, z);
          this.meshGroup.add(baseMesh);

          // 3D Soft Mattress Cushion with Subtle Curves (Target for Raycaster Click)
          const isSelected = this.isSeatSelected(seat.id);
          const isBooked = seat.status === 'booked';

          let hexColor = 0x10b981; // Available Green
          if (isBooked) hexColor = 0x475569; // Booked Muted Slate
          else if (isSelected) hexColor = 0xf43f5e; // Selected Glowing Rose
          else if (seat.status === 'ladies_reserved') hexColor = 0xec4899; // Ladies Pink

          const berthMat = new THREE.MeshPhongMaterial({ color: hexColor, shininess: 80 });
          const berthMesh = new THREE.Mesh(mattressGeo, berthMat);
          berthMesh.position.set(x, yOffset, z);

          berthMesh.userData = { seatId: seat.id, isBooked };
          this.seatMeshMap.set(seat.id, berthMesh);
          this.seatMeshesList.push(berthMesh);
          this.meshGroup.add(berthMesh);

          // 3D Tilted Ergonomic Backrest Cushion with Subtle Curves
          const backrestMesh = new THREE.Mesh(backrestGeo, berthMat);
          backrestMesh.position.set(x - 0.72, yOffset + 0.3, z);
          backrestMesh.rotation.z = -0.25;
          this.meshGroup.add(backrestMesh);

          // 3D Soft White Pillow with Subtle Curves
          const pillowMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
          const pillowMesh = new THREE.Mesh(pillowGeo, pillowMat);
          pillowMesh.position.set(x - 0.55, yOffset + 0.35, z);
          this.meshGroup.add(pillowMesh);

          // 3D Armrests / Side Bolsters
          const bolsterGeo = new THREE.BoxGeometry(1.7, 0.22, 0.12);
          const bolsterMat = new THREE.MeshPhongMaterial({ color: 0x334155 });
          const b1 = new THREE.Mesh(bolsterGeo, bolsterMat);
          b1.position.set(x, yOffset + 0.2, z + 0.55);
          const b2 = new THREE.Mesh(bolsterGeo, bolsterMat);
          b2.position.set(x, yOffset + 0.2, z - 0.55);
          this.meshGroup.add(b1); this.meshGroup.add(b2);

          // Curtain Rail Along Berth Top
          const rodGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.7, 8);
          const rodMat = new THREE.MeshPhongMaterial({ color: 0xc084fc });
          const rod = new THREE.Mesh(rodGeo, rodMat);
          rod.rotation.z = Math.PI / 2;
          rod.position.set(x, yOffset + 0.75, col === 0 ? z + 0.6 : z - 0.6);
          this.meshGroup.add(rod);
        });
      };

      renderDeckSeats(this.lowerDeckSeats, -1.8);
      renderDeckSeats(this.upperDeckSeats, 0.6);
    }
  }

  private update3DSeatColors(): void {
    this.seatMeshMap.forEach((mesh, seatId) => {
      const isSelected = this.isSeatSelected(seatId);
      const isBooked = mesh.userData['isBooked'];
      const mat = mesh.material as THREE.MeshPhongMaterial;

      if (isBooked) {
        mat.color.setHex(0x475569);
      } else if (isSelected) {
        mat.color.setHex(0xf43f5e);
      } else {
        mat.color.setHex(0x10b981);
      }
    });
  }
}
