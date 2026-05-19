import type { Metadata } from "next";

import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import TagList from "@/components/TagList";
import {
  contacts,
  interests,
  profile,
  skillTags,
  timeline,
} from "@/content/site";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "关于我",
  description: "了解我的学习方向、技能栈、经历时间线和联系方式。",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="pb-16">
      <section className="border-b border-border/60 py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[160px_minmax(0,1fr)] lg:items-center">
            <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full border border-border bg-muted/40 text-3xl font-semibold text-muted-foreground">
              XX
            </div>

            <div className="space-y-4 text-center lg:text-left">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                About Me
              </p>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {profile.role}
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {profile.name}
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                {profile.intro}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div className="rounded-2xl border border-border/70 bg-background p-6">
              <SectionHeading
                title="经历 / 时间线"
                description="我目前的学习路径和阶段重点。"
              />
              <div className="space-y-6">
                {timeline.map((item) => (
                  <div key={item.period} className="relative pl-6">
                    <div className="absolute left-0 top-2 h-2.5 w-2.5 rounded-full bg-foreground" />
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {item.period}
                      </p>
                      <h3 className="text-lg font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-border/70 bg-muted/20 p-6">
                <SectionHeading
                  title="技能栈"
                  description="当前重点练习的技术方向。"
                />
                <TagList tags={skillTags} />
              </div>

              <div className="rounded-2xl border border-border/70 bg-background p-6">
                <SectionHeading
                  title="联系方式"
                  description="这里先放静态占位信息。"
                />
                <div className="space-y-3 text-sm text-muted-foreground">
                  {contacts.map((item, index) => (
                    <p key={index}>{item.value}</p>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border/70 bg-background p-6">
                <SectionHeading
                  title="兴趣爱好"
                  description="这些内容会影响我做项目的方式。"
                />
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {interests.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
