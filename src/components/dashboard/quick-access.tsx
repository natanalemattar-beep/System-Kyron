
'use client';

import {
  adminNavGroups,
} from "@/components/app-sidebar-nav-items";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

export function QuickAccess() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminNavGroups.map((group) => (
          <div key={group.title} className="w-full">
              <Card className="bg-card/50 backdrop-blur-sm h-full">
                  <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                          <group.icon className="h-6 w-6 text-primary"/>
                          {group.title}
                      </CardTitle>
                  </CardHeader>
                  <CardContent>
                      <div className="flex flex-col gap-2">
                          {(group.subGroups && group.subGroups.length > 0 ? group.subGroups.flatMap(sg => sg.items) : group.items).slice(0, 4).map((item) => (
                          <div key={`${item.href}-${item.label}`}>
                              <Button
                              asChild
                              variant="secondary"
                              className="justify-start h-10 w-full"
                              >
                              <Link href={item.href}>
                                  <item.icon className="h-4 w-4 mr-2" />
                                  <span>{item.label}</span>
                              </Link>
                              </Button>
                          </div>
                          ))}
                      </div>
                  </CardContent>
              </Card>
          </div>
          ))}
      </div>
    )
}
