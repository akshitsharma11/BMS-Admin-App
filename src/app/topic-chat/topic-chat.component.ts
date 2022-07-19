import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, timer } from 'rxjs';
import { TopicService } from '../services/topic.service';

@Component({
  selector: 'app-topic-chat',
  templateUrl: './topic-chat.component.html',
  styleUrls: ['./topic-chat.component.css']
})
export class TopicChatComponent implements OnInit {

  @ViewChildren('messages') messages: QueryList<any>;
  @ViewChild('content') content: ElementRef;

  topicId;
  allMessages = [];

  counter$: Subscription;
  count = 30;
  countTimer:any = 30;
  
  
  constructor(private topicService:TopicService,private route:ActivatedRoute,private spinner: NgxSpinnerService) { 
    // setTimeout(()=>{
    //   location.reload(); 
    // },30000);

    // this.counter$ = timer(0,1000).pipe(
    //   take(this.count),
    //   // map(() => --this.count)
    // ).subscribe(res=>{
    //   // console.log(res);
    //   this.countTimer = res;
    //   if(res==0)
    //   {
    //     location.reload();
    //   }
    // });
  }

  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe((Params)=>{
      this.topicId = +Params['topicId'];
      console.log("Topic Id : ",this.topicId);
      this.topicService.getAllTopicChats().subscribe(res=>{
        var allChatComments = res["comments"];
        console.log("Length : ",allChatComments.length)
        const index = allChatComments.findIndex(i=>(+i.topicId)==this.topicId);
        if(index!=-1)
        {
          this.allMessages = allChatComments[index].allComments;
          this.allMessages = this.allMessages.sort(function(a, b) {
            var c:any = new Date(a.createdAt);
            var d:any = new Date(b.createdAt);
            return c-d;
          });
        }
        this.spinner.hide();
        console.log(this.allMessages);
      }); 
    });

  }
  
  ngAfterViewInit() {
    this.scrollToBottom();
    this.messages.changes.subscribe(this.scrollToBottom);
  }
  
  scrollToBottom = () => {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) {}
  }

  ngOnDestroy()
  {
    // this.counter$.unsubscribe();
  }

}
// function take(count: number): import("rxjs").OperatorFunction<number, unknown> {
//   throw new Error('Function not implemented.');
// }

