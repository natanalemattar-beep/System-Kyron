"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Building,
  UserPlus,
  ChevronDown,
  ChevronRight,
  Search,
  Trash2,
  ArrowLeft,
  Activity,
  Crown,
  Briefcase,
  User,
  Phone,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { useToast } from "@/hooks/use-toast";

interface Person {
  id: string;
  name: string;
  cargo: string;
  department: string;
  email: string;
  phone: string;
}

interface Department {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

const departments: Department[] = [
  { id: "administracion", name: "Administración", color: "text-emerald-500", bgColor: "bg-emerald-500/10", borderColor: "border-emerald-500/20" },
  { id: "rrhh", name: "RRHH", color: "text-violet-500", bgColor: "bg-violet-500/10", borderColor: "border-violet-500/20" },
  { id: "legal", name: "Legal", color: "text-amber-500", bgColor: "bg-amber-500/10", borderColor: "border-amber-500/20" },
  { id: "it", name: "IT", color: "text-cyan-500", bgColor: "bg-cyan-500/10", borderColor: "border-cyan-500/20" },
  { id: "ventas", name: "Ventas", color: "text-rose-500", bgColor: "bg-rose-500/10", borderColor: "border-rose-500/20" },
];

const initialCeo: Person = {
  id: "ceo-1",
  name: "Director General",
  cargo: "CEO / Director General",
  department: "direccion",
  email: "director@empresa.com",
  phone: "+58 412 000 0000",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function OrganigramaPage() {
  const { toast } = useToast();
  const [ceo, setCeo] = useState<Person>(initialCeo);
  const [people, setPeople] = useState<Person[]>([]);
  const [expandedDepts, setExpandedDepts] = useState<Record<string, boolean>>(
    Object.fromEntries(departments.map((d) => [d.id, true]))
  );
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const [newName, setNewName] = useState("");
  const [newCargo, setNewCargo] = useState("");
  const [newDept, setNewDept] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const filteredPeople = useMemo(() => {
    if (!search.trim()) return people;
    const q = search.toLowerCase();
    return people.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.cargo.toLowerCase().includes(q) ||
        p.department.toLowerCase().includes(q)
    );
  }, [people, search]);

  const getPeopleByDept = (deptId: string) =>
    filteredPeople.filter((p) => p.department === deptId);

  const toggleDept = (deptId: string) =>
    setExpandedDepts((prev) => ({ ...prev, [deptId]: !prev[deptId] }));

  const addPerson = () => {
    if (!newName.trim() || !newCargo.trim() || !newDept) return;
    const person: Person = {
      id: `person-${Date.now()}`,
      name: newName.trim(),
      cargo: newCargo.trim(),
      department: newDept,
      email: newEmail.trim(),
      phone: newPhone.trim(),
    };
    setPeople((prev) => [...prev, person]);
    setNewName("");
    setNewCargo("");
    setNewDept("");
    setNewEmail("");
    setNewPhone("");
    setDialogOpen(false);
    toast({ title: "Persona agregada", description: `${person.name} fue agregado a ${departments.find((d) => d.id === newDept)?.name}` });
  };

  const deletePerson = (id: string) => {
    setPeople((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirm(null);
    toast({ title: "Persona eliminada", description: "Se ha removido del organigrama." });
  };

  const handleExport = () => {
    toast({ title: "Organigrama guardado", description: "La estructura organizacional ha sido guardada exitosamente." });
  };

  const ceoMatchesSearch =
    !search.trim() ||
    ceo.name.toLowerCase().includes(search.toLowerCase()) ||
    ceo.cargo.toLowerCase().includes(search.toLowerCase());

  return (
    <div className="space-y-8 pb-20 relative">
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[150px]" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] rounded-full bg-violet-500/[0.03] blur-[120px]" />
      </div>

      <div>
        <Link href={"/dashboard-empresa" as any}>
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground mb-2">
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Button>
        </Link>
        <motion.header
          className="mt-2 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <Activity className="h-3 w-3 animate-pulse" /> ORGANIGRAMA
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </motion.div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-[1.05]">
              Estructura{" "}
              <span className="bg-gradient-to-r from-primary via-blue-400 to-cyan-400 bg-clip-text text-transparent italic">
                Organizacional
              </span>
            </h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mt-2">
              Estructura Organizacional Interactiva de tu Empresa
            </p>
          </div>
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              onClick={handleExport}
              variant="outline"
              className="rounded-2xl h-10 px-6 font-black uppercase text-[10px] tracking-[0.15em] border-primary/20 text-primary hover:bg-primary/10 transition-all"
            >
              <Building className="mr-2 h-4 w-4" />
              Guardar
            </Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-2xl h-10 px-6 font-black uppercase text-[10px] tracking-[0.15em] bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-[0_8px_30px_-5px_rgba(14,165,233,0.4)] transition-all duration-300 hover:shadow-[0_12px_40px_-5px_rgba(14,165,233,0.5)] hover:-translate-y-0.5">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Agregar Persona
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-lg font-black uppercase tracking-tight">
                    Agregar Persona
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider">Nombre Completo</Label>
                    <Input
                      placeholder="Ej: María González"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider">Cargo</Label>
                    <Input
                      placeholder="Ej: Gerente de Ventas"
                      value={newCargo}
                      onChange={(e) => setNewCargo(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider">Departamento</Label>
                    <Select value={newDept} onValueChange={setNewDept}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((d) => (
                          <SelectItem key={d.id} value={d.id}>
                            {d.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider">Email</Label>
                    <Input
                      placeholder="correo@empresa.com"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider">Teléfono</Label>
                    <Input
                      placeholder="+58 412 000 0000"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)} className="rounded-xl">
                    Cancelar
                  </Button>
                  <Button
                    onClick={addPerson}
                    disabled={!newName.trim() || !newCargo.trim() || !newDept}
                    className="rounded-xl bg-gradient-to-r from-primary to-blue-600"
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Agregar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.div>
        </motion.header>
      </div>

      <motion.div
        className="flex flex-col sm:flex-row items-center gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
          <Input
            placeholder="Buscar persona por nombre, cargo o departamento..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 rounded-xl h-11 bg-card/50 border-border/30"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {departments.map((d) => (
            <Badge
              key={d.id}
              variant="outline"
              className={cn("text-[9px] font-bold uppercase tracking-wider cursor-default", d.bgColor, d.borderColor, d.color)}
            >
              {d.name}: {people.filter((p) => p.department === d.id).length}
            </Badge>
          ))}
          <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-wider bg-primary/10 border-primary/20 text-primary cursor-default">
            Total: {people.length + 1}
          </Badge>
        </div>
      </motion.div>

      <div className="flex flex-col items-center">
        {ceoMatchesSearch && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <Card className="w-[280px] md:w-[340px] border-2 border-primary/30 bg-gradient-to-br from-primary/[0.08] via-card/80 to-blue-500/[0.05] rounded-2xl overflow-hidden shadow-[0_0_40px_-10px_rgba(14,165,233,0.2)] hover:shadow-[0_0_50px_-10px_rgba(14,165,233,0.3)] transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center mb-4 shadow-lg">
                  <Crown className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-base font-black text-foreground uppercase tracking-tight">{ceo.name}</h3>
                <p className="text-[11px] text-primary font-bold mt-1">{ceo.cargo}</p>
                <div className="flex items-center justify-center gap-3 mt-3">
                  {ceo.email && (
                    <span className="text-[9px] text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3" /> {ceo.email}
                    </span>
                  )}
                </div>
                {ceo.phone && (
                  <span className="text-[9px] text-muted-foreground flex items-center justify-center gap-1 mt-1">
                    <Phone className="h-3 w-3" /> {ceo.phone}
                  </span>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {ceoMatchesSearch && (
          <div className="w-px h-10 bg-border/40 relative">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/40" />
          </div>
        )}

        <div className="relative w-full">
          {departments.length > 1 && (
            <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 h-px bg-border/30" style={{ width: `${Math.min(90, departments.length * 18)}%` }} />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
            {departments.map((dept, deptIdx) => {
              const deptPeople = getPeopleByDept(dept.id);
              const isExpanded = expandedDepts[dept.id];
              const hasPeople = deptPeople.length > 0;

              return (
                <motion.div
                  key={dept.id}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * deptIdx + 0.5, duration: 0.4 }}
                >
                  <div className="hidden md:block w-px h-6 bg-border/30" />

                  <Card
                    className={cn(
                      "w-full max-w-[220px] rounded-2xl border cursor-pointer transition-all duration-300 hover:scale-[1.03]",
                      dept.bgColor,
                      dept.borderColor,
                      "hover:shadow-lg"
                    )}
                    onClick={() => toggleDept(dept.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className={cn("mx-auto w-10 h-10 rounded-xl flex items-center justify-center mb-2 border", dept.bgColor, dept.borderColor)}>
                        <Briefcase className={cn("h-5 w-5", dept.color)} />
                      </div>
                      <h4 className="text-xs font-black uppercase tracking-tight text-foreground">{dept.name}</h4>
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <Badge variant="outline" className={cn("text-[8px] font-bold", dept.bgColor, dept.borderColor, dept.color)}>
                          <Users className="h-2.5 w-2.5 mr-1" />
                          {people.filter((p) => p.department === dept.id).length}
                        </Badge>
                        {hasPeople && (
                          isExpanded ? (
                            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <AnimatePresence>
                    {isExpanded && hasPeople && (
                      <motion.div
                        className="flex flex-col items-center w-full mt-0"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-px h-4 bg-border/30" />
                        <div className="flex flex-col items-center gap-2 w-full">
                          {deptPeople.map((person, pIdx) => (
                            <motion.div
                              key={person.id}
                              className="w-full max-w-[220px]"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              transition={{ delay: 0.05 * pIdx }}
                            >
                              {pIdx > 0 && <div className="w-px h-2 bg-border/20 mx-auto" />}
                              <Card className="rounded-xl border border-border/30 bg-card/50 hover:bg-card/80 transition-all group/person relative overflow-hidden">
                                <CardContent className="p-3">
                                  <div className="flex items-start gap-3">
                                    <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0", dept.bgColor, dept.color)}>
                                      {getInitials(person.name)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-[11px] font-bold text-foreground truncate">{person.name}</p>
                                      <p className="text-[9px] text-muted-foreground truncate">{person.cargo}</p>
                                      {person.email && (
                                        <p className="text-[8px] text-muted-foreground/60 flex items-center gap-1 mt-1 truncate">
                                          <Mail className="h-2.5 w-2.5 shrink-0" /> {person.email}
                                        </p>
                                      )}
                                      {person.phone && (
                                        <p className="text-[8px] text-muted-foreground/60 flex items-center gap-1 truncate">
                                          <Phone className="h-2.5 w-2.5 shrink-0" /> {person.phone}
                                        </p>
                                      )}
                                    </div>
                                    <Dialog
                                      open={deleteConfirm === person.id}
                                      onOpenChange={(open) => setDeleteConfirm(open ? person.id : null)}
                                    >
                                      <DialogTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-7 w-7 p-0 opacity-0 group-hover/person:opacity-100 transition-opacity text-muted-foreground hover:text-rose-500 shrink-0"
                                        >
                                          <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="sm:max-w-sm">
                                        <DialogHeader>
                                          <DialogTitle className="text-base font-black">¿Eliminar persona?</DialogTitle>
                                        </DialogHeader>
                                        <p className="text-sm text-muted-foreground">
                                          ¿Estás seguro de eliminar a <strong>{person.name}</strong> del organigrama?
                                        </p>
                                        <DialogFooter>
                                          <Button variant="outline" onClick={() => setDeleteConfirm(null)} className="rounded-xl">
                                            Cancelar
                                          </Button>
                                          <Button
                                            variant="destructive"
                                            onClick={() => deletePerson(person.id)}
                                            className="rounded-xl"
                                          >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Eliminar
                                          </Button>
                                        </DialogFooter>
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {isExpanded && !hasPeople && (
                    <motion.div
                      className="flex flex-col items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="w-px h-4 bg-border/20" />
                      <div className="w-full max-w-[220px] rounded-xl border border-dashed border-border/20 p-3 text-center">
                        <User className="h-4 w-4 mx-auto text-muted-foreground/30 mb-1" />
                        <p className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider">Sin miembros</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
