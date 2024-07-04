import { memo, useState, useEffect } from "react";
import Link from "next/link";
import router from "next/router";

import type { ItemType } from "@refeed/types/item";

import type { FeedTypes } from "../../types/feed";
import { FeedInfo } from "./FeedInfo";
import { Title } from "./FeedTitle";
import { MagazineImage } from "./MagazineImage";
import { useUser } from "@supabase/auth-helpers-react";
import { Markets } from "./Markets";

export const MagazineItem = memo(
  (props: {
    i: number;
    item?: ItemType;
    FeedType: FeedTypes;
    markRead: () => void;
  }) => {
    const { item, markRead, FeedType } = props;

    const pathWithoutQuery = router.asPath.split("?")[0];

    const user = useUser()

    return (
      <Link
        href={`${pathWithoutQuery}/?item=` + item?.id}
        replace={false}
        shallow
        scroll
        onClick={() => {
          {user && user?.aud === 'authenticated' ? markRead() : null }
        }}
      >
        <NonLinkedMagazineItem item={item} FeedType={FeedType} />
      </Link>
    );
  },
);

// NOTE:Removing flex on mobile makes this look super nice on mobile web. Make this its own layout?

export const NonLinkedMagazineItem = ({
  item,
  FeedType,
}: {
  item?: ItemType;
  FeedType: FeedTypes;
}) => (
  <div
    className={`relative mx-1 mt-1 flex w-screen flex-row space-x-[4px] rounded-md pb-2 pt-2 md:w-[33em]
          ${item?.marked_read ? "opacity-80" : ""}
        `}
  >
    <MagazineImage item={item!} FeedType={FeedType} />
    <div className="flex w-full flex-col">
      <Title FeedType={FeedType} title={item?.title ?? ""} />
      <FeedInfo FeedType={FeedType} item={item!} />
      {/* @TODO add this in */}
      {item?.markets?.length > 0 && <Markets FeedType={FeedType} title={`${item?.markets?.length} Related Markets`} />}
    </div>
  </div>
);

MagazineItem.displayName == "MagazineItem";