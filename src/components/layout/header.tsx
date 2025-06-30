import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Package2, PlusCircle } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-primary px-4 md:px-6 text-primary-foreground z-50">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <a
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base text-primary-foreground"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Dataflow Canvas</span>
        </a>
        <h1 className="text-lg font-semibold">Dataflow Canvas</h1>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden bg-primary text-primary-foreground border-primary-foreground/50 hover:bg-primary/90"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
           <nav className="grid gap-6 text-lg font-medium">
            <a href="#" className="flex items-center gap-2 text-lg font-semibold">
              <Package2 className="h-6 w-6 text-foreground" />
              <span className="text-foreground">Dataflow Canvas</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
                Dashboard
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
                Jobs
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
                Metadata
            </a>
           </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 justify-end">
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            <PlusCircle className="mr-2 h-5 w-5" />
            New Job
        </Button>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                    <Avatar>
                        <AvatarImage src="https://placehold.co/32x32.png" alt="@user" data-ai-hint="profile avatar" />
                        <AvatarFallback>DC</AvatarFallback>
                    </Avatar>
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
