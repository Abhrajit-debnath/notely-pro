'use client';

import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  TextInput,
  Stack,
  Badge,
  Group,
  ActionIcon,
  Button,
  Avatar,
  Tooltip,
  Divider,
  ScrollArea,
  Card,
  Tabs
} from "@mantine/core";
import {
  IconSearch,
  IconShare,
  IconStar,
  IconStarFilled,
  IconClock,
  IconCloudCheck,
  IconBold,
  IconItalic,
  IconUnderline,
  IconCode,
  IconList,
  IconQuote,
  IconHeading,
  IconDotsVertical,
  IconPlus,
  IconSend
} from "@tabler/icons-react";

interface Note {
  id: string;
  title: string;
  snippet: string;
  date: string;
  tags: string[];
  isFavorite: boolean;
  content: string;
}

export default function NotesPage() {
  // Mock notes database
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Product Launch Roadmap 🚀",
      snippet: "Drafting the Q3 release sync. Key checkpoints include marketing collateral designs, API documentation finalization...",
      date: "Jul 5",
      tags: ["Work", "Launch"],
      isFavorite: true,
      content: `<h2>Product Launch Roadmap 🚀</h2>
<p>Drafting the Q3 release sync. Key checkpoints include marketing collateral designs, API documentation finalization, and server staging test suites.</p>
<h3>Checkpoint Timeline</h3>
<ul>
  <li><strong>Milestone 1:</strong> Staging build validation and final load tests (Due by July 15).</li>
  <li><strong>Milestone 2:</strong> Marketing copy approval and press release distribution (Due by July 22).</li>
  <li><strong>Milestone 3:</strong> Live mainnet deployment (Scheduled for August 1).</li>
</ul>
<p>Ensure we sync with the backend team for real-time socket connections before deployment.</p>`
    },
    {
      id: "2",
      title: "Design System Guidelines",
      snippet: "Design tokens for dark/light mode configurations. Use CSS variables for custom themes to keep specificity low...",
      date: "Jul 4",
      tags: ["Design", "Notely"],
      isFavorite: false,
      content: `<h2>Design System Guidelines 🎨</h2>
<p>Design tokens for dark/light mode configurations. Use CSS variables for custom themes to keep specificity low and maintain Tailwind v4 / Mantine v9 compatibility.</p>
<pre><code>--color-background: #ffffff;
--color-foreground: #171717;</code></pre>
<p>Maintain consistent padding across cards (use <strong>md</strong> radius and padding section markers).</p>`
    },
    {
      id: "3",
      title: "Collaborative Sync Agenda",
      snippet: "Multiplayer editing structures utilizing Y.js CRDT connections. Handle concurrent edits without central server bottleneck...",
      date: "Jun 28",
      tags: ["Engineering"],
      isFavorite: true,
      content: `<h2>Collaborative Sync Agenda 🤝</h2>
<p>Multiplayer editing structures utilizing Y.js CRDT connections. Handle concurrent edits without central server bottleneck.</p>
<ul>
  <li>Setup y-websocket provider</li>
  <li>Configure remote presence cursor coordinates</li>
  <li>Setup automatic local persistence in IndexedDB</li>
</ul>`
    },
    {
      id: "4",
      title: "Personal Brain Dump 🧠",
      snippet: "Random ideas for the next SaaS project. Side project setups, workflow automations, and productivity tools integrations...",
      date: "Jun 15",
      tags: ["Ideas"],
      isFavorite: false,
      content: `<h2>Personal Brain Dump 🧠</h2>
<p>Random ideas for the next SaaS project. Side project setups, workflow automations, and productivity tools integrations.</p>`
    }
  ]);

  const [activeNoteId, setActiveNoteId] = useState("1");
  const [searchQuery, setSearchQuery] = useState("");
  const activeNote = notes.find((note) => note.id === activeNoteId) || notes[0];

  // Toggle favorite helper
  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotes(notes.map(note => note.id === id ? { ...note, isFavorite: !note.isFavorite } : note));
  };

  // Filter notes based on search query
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.snippet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Flex className="h-full w-full overflow-hidden bg-white dark:bg-neutral-900 transition-colors duration-300">

      {/* Column 1: Notes List Panel (Responsive widths) */}
      <Box className="w-full lg:max-w-sm border-r border-neutral-200 dark:border-neutral-800 flex flex-col h-full bg-neutral-50/50 dark:bg-neutral-900/30">

        {/* Search header */}
        <Box className="p-4 space-y-3">
          <TextInput
            placeholder="Search notes..."
            leftSection={<IconSearch size={16} className="text-neutral-400" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            radius="md"
            classNames={{
              input: "bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800"
            }}
          />

          {/* Notes list controls */}
          <Group justify="space-between">
            <Text size="xs" fw={700} className="text-neutral-400 dark:text-neutral-500 uppercase tracking-wider font-sans">
              Recent Notes
            </Text>
            <ActionIcon variant="subtle" color="notely" radius="md" className="hover:bg-neutral-100 dark:hover:bg-neutral-800">
              <IconPlus size={16} />
            </ActionIcon>
          </Group>
        </Box>

        {/* Tab filters */}
        <Box className="px-4 mb-2">
          <Tabs defaultValue="all" classNames={{
            list: "border-0 gap-1",
            tab: "text-xs font-semibold rounded-lg px-3 py-1.5 border-0 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 data-[active=true]:bg-[var(--mantine-color-notely-light)] data-[active=true]:text-[var(--mantine-color-notely-light-color)]"
          }}>
            <Tabs.List>
              <Tabs.Tab value="all">All</Tabs.Tab>
              <Tabs.Tab value="favorites" leftSection={<IconStar size={12} />}>Favorites</Tabs.Tab>
              <Tabs.Tab value="recent" leftSection={<IconClock size={12} />}>Recent</Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </Box>

        {/* Scrollable list */}
        <ScrollArea className="flex-1 px-4 pb-4">
          <Stack gap="xs">
            {filteredNotes.map((note) => (
              <Card
                key={note.id}
                onClick={() => setActiveNoteId(note.id)}
                radius="lg"
                padding="md"
                withBorder
                className={`cursor-pointer transition-all duration-200 ${activeNoteId === note.id
                    ? "bg-white dark:bg-neutral-900 border-[var(--mantine-color-notely-5)] shadow-md ring-1 ring-[var(--mantine-color-notely-light)]"
                    : "bg-white/60 dark:bg-neutral-950/20 border-neutral-200 dark:border-neutral-800/80 hover:bg-white dark:hover:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700"
                  }`}
              >
                <Stack gap={8}>
                  <Group justify="space-between" wrap="nowrap">
                    <Text fw={700} size="sm" className="text-neutral-800 dark:text-neutral-100 truncate font-sans">
                      {note.title || "Untitled Note"}
                    </Text>
                    <ActionIcon
                      variant="subtle"
                      color={note.isFavorite ? "amber" : "gray"}
                      onClick={(e) => toggleFavorite(note.id, e)}
                      className="hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      {note.isFavorite ? <IconStarFilled size={15} /> : <IconStar size={15} />}
                    </ActionIcon>
                  </Group>

                  <Text size="xs" lineClamp={2} className="text-neutral-500 dark:text-neutral-400 leading-normal">
                    {note.snippet}
                  </Text>

                  <Group justify="space-between" align="center" className="mt-1">
                    <Group gap={4}>
                      {note.tags.map(tag => (
                        <Badge
                          key={tag}
                          variant="light"
                          color="notely"
                          size="xs"
                          radius="sm"
                          classNames={{ label: "text-[9px] font-bold" }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </Group>
                    <Text size="10px" className="text-neutral-400 font-semibold font-sans">
                      {note.date}
                    </Text>
                  </Group>
                </Stack>
              </Card>
            ))}
          </Stack>
        </ScrollArea>
      </Box>

      {/* Column 2: Note Editor Panel (Fills remaining space) */}
      <Flex direction="column" className="flex-1 h-full overflow-hidden bg-white dark:bg-neutral-900" visibleFrom="md">

        {/* Editor Header Area */}
        <Flex
          align="center"
          justify="space-between"
          className="h-16 px-6 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60"
        >
          {/* Cloud save indicator */}
          <Group gap="xs">
            <IconCloudCheck size={18} className="text-emerald-500" />
            <Text size="xs" className="text-emerald-500 font-semibold font-sans">
              Saved to cloud
            </Text>
          </Group>

          {/* Collaborator stack and share controls */}
          <Group gap="md" >
            {/* Multiplayer Avatars */}
            <Tooltip.Group openDelay={300} closeDelay={100}>
              <Avatar.Group>
                <Tooltip label="You" withArrow>
                  <Avatar radius="xl" size="sm" color="notely" src={null}>JD</Avatar>
                </Tooltip>
                <Tooltip label="Alice (Editing)" withArrow>
                  <Avatar radius="xl" size="sm" color="pink" src={null}>AM</Avatar>
                </Tooltip>
                <Tooltip label="Bob (Viewing)" withArrow>
                  <Avatar radius="xl" size="sm" color="cyan" src={null}>BS</Avatar>
                </Tooltip>
              </Avatar.Group>
            </Tooltip.Group>

            <Divider orientation="vertical" className="border-neutral-200 dark:border-neutral-800 h-6" />

            <Button
              size="xs"
              radius="md"
              leftSection={<IconShare size={14} />}
              className="bg-indigo-600 hover:bg-indigo-700 font-semibold shadow-sm"
            >
              Share
            </Button>

            <ActionIcon variant="subtle" color="gray" className="rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
              <IconDotsVertical size={18} />
            </ActionIcon>
          </Group>
        </Flex>

        {/* Mock Editor Toolbar (Styling TipTap header controls) */}
        <Group gap="xs" className="px-6 py-2 border-b border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-950/20">
          <ActionIcon variant="subtle" color="gray" size="sm"><IconBold size={16} /></ActionIcon>
          <ActionIcon variant="subtle" color="gray" size="sm"><IconItalic size={16} /></ActionIcon>
          <ActionIcon variant="subtle" color="gray" size="sm"><IconUnderline size={16} /></ActionIcon>
          <ActionIcon variant="subtle" color="gray" size="sm"><IconCode size={16} /></ActionIcon>

          <Divider orientation="vertical" className="border-neutral-200 dark:border-neutral-800 h-4 mx-1" />

          <ActionIcon variant="subtle" color="gray" size="sm"><IconHeading size={16} /></ActionIcon>
          <ActionIcon variant="subtle" color="gray" size="sm"><IconList size={16} /></ActionIcon>
          <ActionIcon variant="subtle" color="gray" size="sm"><IconQuote size={16} /></ActionIcon>
        </Group>

        {/* Editor Canvas Container */}
        <ScrollArea className="flex-1 bg-white dark:bg-neutral-900 px-8 md:px-16 py-8">
          <Box className="max-w-[720px] mx-auto prose dark:prose-invert font-sans">
            {/* Title Input area */}
            <Text
              size="xl"
              className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-50 outline-none border-b border-transparent focus:border-neutral-200 dark:focus:border-neutral-800 pb-3 mb-6 tracking-tight"
              contentEditable
              suppressContentEditableWarning
            >
              {activeNote.title}
            </Text>

            {/* Note markup content */}
            <Box
              className="outline-none text-neutral-800 dark:text-neutral-200 leading-relaxed space-y-4 text-sm md:text-base"
              contentEditable
              suppressContentEditableWarning
              dangerouslySetInnerHTML={{ __html: activeNote.content }}
            />
          </Box>
        </ScrollArea>
      </Flex>
    </Flex>
  );
}
