import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule here

@Component({
  selector: 'app-quotes-section',
  imports: [HttpClientModule],
  standalone: true,
  template: `
    <div 
    class="relative w-full h-screen bg-cover bg-center"
  [style.backgroundImage]="'url(quoteBg.jpg)'"
    >
      <!-- Optional Overlay for Better Text Contrast -->
      <div class="absolute inset-0 bg-black opacity-40"></div>
      
      <!-- Content Container for Quotes -->
      <div class="relative z-10 flex flex-col justify-center items-center h-full text-white p-4">
        <div class="text-center">
          <p class="text-3xl italic">"{{ quote }}"</p>
          <p class="mt-2 text-xl"><strong>- {{ author }}</strong></p>
        </div>
        <button 
          class="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          (click)="getRandomQuote()"
        >
          Show Another Quote
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./quotes-section.component.css']
})
export class MotivationalQuoteComponent implements OnInit, OnDestroy {
  quote: string = '';
  author: string = '';
  quotes: { text: string, author: string }[] = [];
  private quoteInterval: any;
  backgroundImageUrl: string = 'path_to_your_image.jpg'; // Replace with the path to your image

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadQuotes();
    // Set interval to change the quote every 20 minutes
    this.quoteInterval = setInterval(() => this.getRandomQuote(), 1200000); // 20 minutes in ms
  }

  ngOnDestroy() {
    // Clean up the interval when the component is destroyed
    if (this.quoteInterval) {
      clearInterval(this.quoteInterval);
    }
  }

  loadQuotes() {
    this.http.get<any[]>('quotes.json').subscribe(data => {
      // Store both quote and author
      this.quotes = data.map(item => ({
        text: item.quote,
        author: item.author
      }));
      this.getRandomQuote(); // Get the first random quote when loaded
    });
  }

  getRandomQuote() {
    const randomQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
    this.quote = randomQuote.text;
    this.author = randomQuote.author;
  }
}
